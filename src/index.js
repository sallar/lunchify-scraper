import getVenues from 'scrappers/venues';
import util from 'util';

async function scrap() {
  const venues = await getVenues();

  const menusPromises = venues.map(venue => venue.scrapMenu());
  Promise.all(menusPromises).then(menus => {
    console.log(util.inspect(menus, {showHidden: false, depth: null}));
  });
}

scrap();