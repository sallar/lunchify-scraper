import getVenues from 'scrappers/venues';

async function scrap() {
  try {
    const venues = await getVenues();

    const menusPromises = venues.map(venue => venue.scrapMenu());
    Promise.all(menusPromises).then(menus => {
      console.log(menus);
    })
  } catch (err) {
    console.error(err);
  }
}

scrap();