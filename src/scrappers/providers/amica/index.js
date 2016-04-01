import moment from 'moment';
import fetch from 'node-fetch';
import { dateFormat } from 'config';
import { extractFlags, removeFlags } from './flags';

/**
 * Combine two languages
 * @param  menuArr
 * @return {Array.<Object>}
 */
function combineMenus(menuArr) {
  let meals = {};

  menuArr.forEach(langMenu => {
    langMenu.forEach(menu => {
      if (!meals.hasOwnProperty(menu.date)) {
        meals[menu.date] = [];
      }
      meals[menu.date] = meals[menu.date].concat(menu.menu);
    });
  });

  return Object.keys(meals).map(date => ({
    date,
    menu: meals[date]
  })).filter(menu => menu.menu.length > 0);
}

/**
 * Normalize data for each meal
 * @param menu
 * @param lang
 * @return {Array<String>}
 */
function normalizeMealData(menu, lang) {
  return menu.reduce((prev, curr) => {
    return prev.concat(curr.Components);
  }, []).map(title => ({
    title: removeFlags(title),
    flags: extractFlags(title),
    lang
  }));
}

export default {
  /**
   * Scrapes data of the given venue according to the schema
   *
   * @param venue
   * @returns {Promise.<Array>}
   */
  scrapMenu(venue) {
    return Promise.all([
      this.fetch(venue, 'eng'),
      this.fetch(venue, 'fin')
    ]).then(combineMenus);
  },

  /**
   * Fetches the data from lounaat
   *
   * @param venue
   * @param lang
   * @returns {Promise}
   */
  fetch(venue, lang) {
    // Get date objects for rest of the week
    let date = moment().day(1).format('YYYY-MM-DD');
    let url = [
      `http://www.amica.fi/modules/json/json/Index?`,
      `costNumber=${venue.provider_id}&language=${lang.substr(0, 2)}&firstDay=${date}`
    ].join('');

    return fetch(url).then(resp => resp.json()).then(resp => this.normalizeData(resp, lang));
  },

  /**
   * Normalizes raw scrapped data according to the schema
   * @param items
   * @param lang
   * @returns {Array}
   */
  normalizeData(menu, lang) {
    return menu.MenusForDays.map(day => ({
      date: moment(day.Date).format(dateFormat),
      menu: normalizeMealData(day.SetMenus, lang)
    }));
  }
};
