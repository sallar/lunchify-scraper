import { getVenues, saveMenus } from 'scrappers/venues';
import util from 'util';

async function scrap() {
  const venues = await getVenues();
  const menusPromises = venues.map(venue => venue.scrapMenu());

  Promise.all(menusPromises).then(menus => {
    let result = menus.map((menu, i) => ({
      venue: venues[i].get("id"),
      menus: menu
    }));
    return saveMenus(result);
  }).then(result => {
    console.log(`Saved ${result.length} venues to API`);
  }).catch(err => {
    console.log(err);
  });
}

scrap();
