import osmosis  from 'osmosis';

export default {
  scrapMenu(venue) {
    return new Promise((resolve, reject) => {
      const items = [];

      osmosis
        .get(venue.url)
        .find('#menu > div:not(.adsq)')
        .set({
          'title': '.item-header > h3'
        })
        .data(data => items.push(data))
        .done(() => resolve(items))
        .error(error => reject(error));
    });
  }
};
