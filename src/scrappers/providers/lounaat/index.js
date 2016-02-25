import Xray from 'x-ray';
import moment from 'moment';
import { dateFormat } from 'config';
import { extractFlags, removeFlags } from './flags';

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
      xray(venue.url, '#menu > div:not(.adsq)', [{
        date: 'h3',
        menu: xray('.menu-item', ['.dish'])
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
    return items
      .map(
        item => ({
          date: item.date = moment(item.date, 'DD.MM').format(dateFormat),
          menu: item.menu
            .map(title => ({flags: extractFlags(title), title: removeFlags(title)}))
            .filter(({title}) => !/:$|^\s*\*\s?$/.test(title))
        })
      );
  }
};
