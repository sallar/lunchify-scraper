import Xray from 'x-ray';
import moment from 'moment';
import franc from 'franc';
import { dateFormat } from 'config';
import { extractFlags, removeFlags } from './flags';

function normalizeForLang(title, lang) {
  if (!lang) {
    lang = franc(title, {
      whitelist: ['eng', 'fin']
    });
  }
  return {
    flags: extractFlags(title),
    title: removeFlags(title),
    lang: lang
  }
}

export default {
  /**
   * Scrapes data of the given venue according to the schema
   *
   * @param venue
   * @returns {Promise.<Array>}
   */
  scrapMenu(venue) {
    return this.fetch(venue).then(this.normalizeData);
  },

  /**
   * Fetches the data from lounaat
   *
   * @param venue
   * @returns {Promise}
   */
  fetch(venue) {
    const xray = Xray();

    return new Promise((resolve, reject) => {
      xray(`http://www.lounaat.info/lounas/${venue.provider_id}/${venue.city}`, '#menu > div:not(.adsq)', [{
        date: 'h3',
        menu: xray('.menu-item', ['.dish']),
        info: xray('.menu-item', ['.info'])
      }])(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  /**
   * Normalizes raw scrapped data according to the schema
   * @param items
   * @returns {Array}
   */
  normalizeData(items) {
    return items.map(item => {
      let menu = [];

      if (item.info.length > 2) {
        menu = [
          ...item.info.map(title => normalizeForLang(title, 'eng')),
          ...item.menu.map(title => normalizeForLang(title, 'fin'))
        ];
      } else {
        menu = item.menu.map(title => normalizeForLang(title));
      }

      return {
        date: item.date = moment(item.date, 'DD.MM').format(dateFormat),
        menu: menu.filter(({title}) => !/:$|^\s*\*\s?$/.test(title))
      };
    });
  }
};
