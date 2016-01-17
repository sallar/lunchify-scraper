/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
import config from "../config";
import fetch from "node-fetch";

console.log(config.apiUrl);

export function findVenues() {
    return fetch(config.apiUrl + "/venues").then(function(res) {
        return res.json();
    });
};
