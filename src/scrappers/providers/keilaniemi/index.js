import moment from 'moment';
import { dateFormat } from 'config';
import { getURL, downloadPDF, extraText } from './pdf';

export default {
  /**
   * Scrapes data of the given venue according to the schema
   *
   * @param venue
   * @returns {Promise.<Array>}
   */
  scrapMenu(venue) {
    return new Promise(resolve => {
      this.fetch(venue)
        .then(this.normalizeData)
        .catch(err => {
          resolve([]);
        });
    });
  },

  /**
   * Fetches the data from lounaat
   *
   * @param venue
   * @returns {Promise}
   */
  fetch(venue) {
    return getURL(venue.provider_id)
      .then(downloadPDF)
      .then(extraText);
  },

  /**
   * Normalizes raw scrapped data according to the schema
   * @param items
   * @returns {Array}
   */
  normalizeData(items) {
    console.log(items);
    return [];
  }
};
