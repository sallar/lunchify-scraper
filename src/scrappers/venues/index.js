import { client } from 'services/api';
import Venue from './venue';

export function getVenues() {
  return client
    .getVenues()
    .then(data => data.map(venue => new Venue(venue)));
}

export function saveMenus(data) {
  data = data.map(venue => client.submitMenu(venue));
  return Promise.all(data);
}
