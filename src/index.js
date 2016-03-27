import getVenues from 'scrappers/venues';
import util from 'util';

async function scrap() {
  const venues = await getVenues();
  const menusPromises = venues.map(venue => venue.scrapMenu());

  Promise.all(menusPromises).then(menus => {
    console.log(menus);
  }).catch(err => {
    console.log(err);
  });
}

scrap();
