import { client } from 'services/api';
import Venue from './venue';

export default function getVenues() {
  return client
    .getVenues()
    .then(data => data.map(venue => new Venue(venue)));
}
