import moment from 'moment';
import { dateFormat } from 'config';
import { getURL, downloadPDF, extraText } from './pdf';
import { extractFlags, removeFlags } from './flags';

function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        .then(data => {
          resolve(data);
        })
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
    let menus = {};
    let dateRegex = /(\d{1,2}\.\d{1,2}\.)/;
    let lastDate = null;

    items.forEach(line => {
      let dateMatch = line.text.match(dateRegex)
      if (dateMatch) {
        [lastDate] = dateMatch;
        lastDate = moment(lastDate, 'DD.MM').format(dateFormat);
        menus[lastDate] = [];
      } else if (lastDate) {
        menus[lastDate].push({
          lang: line.bold ? 'fin' : 'eng',
          title: capitalizeFirstLetter(removeFlags(line.text)),
          flags: extractFlags(line.text)
        });
      }
    });

    return Object.keys(menus).map(date => ({
      date,
      menu: menus[date]
    }));
  }
};
