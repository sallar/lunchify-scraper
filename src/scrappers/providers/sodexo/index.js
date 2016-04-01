import moment from 'moment';
import fetch from 'node-fetch';
import { dateFormat } from 'config';

export default {
  /**
   * Scrapes data of the given venue according to the schema
   *
   * @param venue
   * @returns {Promise.<Array>}
   */
  scrapMenu(venue) {
    return this.fetch(venue);
  },

  /**
   * Fetches the data from lounaat
   *
   * @param venue
   * @returns {Promise}
   */
  fetch(venue) {
    // Get date objects for rest of the week
    let dates = [];
    for (let i = moment().day(); i <= 5; i += 1) {
      dates.push(moment().day(i));
    }

    // Turn all date objects into URLs
    let urls = dates.map(date => {
      let dateStr = date.format('YYYY/MM/DD');
      return `http://www.sodexo.fi/ruokalistat/output/daily_json/${venue.provider_id}/${dateStr}/fi`;
    });

    // Download URLs
    let promises = urls.map(url => fetch(url).then(resp => resp.json()));

    // Normalize data
    return Promise.all(promises).then(response => {
      return response.map((data, index) => ({
        date: dates[index].format(dateFormat),
        menu: this.normalizeData(data)
      }));
    });
  },

  /**
   * Normalizes raw scrapped data according to the schema
   * @param items
   * @returns {Array}
   */
  normalizeData(items) {
    let output = [];

    if (items.hasOwnProperty('courses') && items.courses.length > 0) {
      items.courses.forEach(item => {
        ['eng', 'fin'].forEach(lang => {
          let title = item[`title_${lang.substr(0, 2)}`];
          let flags = [];
          if (item.hasOwnProperty('properties')) {
            flags = item.properties.split(/,\s/).map(prop => prop.toLowerCase());
          }
          if (typeof title === "string" && title.length > 0) {
            output.push({
              title,
              flags,
              lang
            });
          }
        });
      });
    }

    return output;
  }
};
