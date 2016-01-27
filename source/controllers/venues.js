/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
import config from "../config";
import fetch from "node-fetch";
import Venue from "../models/venue";

export function findVenues() {
    return fetch(`${config.apiUrl}/venues`)
        .then(res => res.json())
        .then(venues => {
            return venues.map(venueData => new Venue(venueData));
        });
};
