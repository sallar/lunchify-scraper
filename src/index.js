import { getVenues, saveMenus } from 'scrappers/venues';

async function boot() {
  try {
  const venues = await getVenues();
  const menusPromises = venues.map(venue => venue.scrapMenu());

  Promise.all(menusPromises).then(menus => {
    let result = menus.map((menu, i) => ({
      venue: venues[i].get("id"),
      menus: menu
    }));
    console.log(JSON.stringify(result, undefined, 2));
    //return saveMenus(result);
  }).then(result => {
    console.log(`Saved ${result.length} venues to API`);
  }).catch(err => {
    console.log(err.stack);
  });

} catch (e) {
  console.log(e);
}
}

boot();
