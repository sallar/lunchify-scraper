import getVenues from 'scrappers/venues';
import util from 'util';
import prettyjson from 'prettyjson';

async function scrap() {
  const venues = await getVenues();

  const menusPromises = venues.map(venue => venue.scrapMenu());
  Promise.all(menusPromises).then(menus => {
    console.log(prettyjson.render(menus));
  });
}

scrap();
