import Scraper from "./scraper";
import config from "../../config";
import {urlFormat} from "../../helpers/scraper";
import moment from "moment";
import fetch from "node-fetch";
import promiseArrays from "promise-arrays";

class AmicaScraper extends Scraper {

    constructor(id) {
        super(id);
        this.moment = moment();
        this.url = "http://www.amica.fi/modules/json/json/Index?costNumber=[ID]&language=en&firstDay=[DATE]";
    }

    getMenu() {
        return new Promise((resolve, reject) => {
            const monday = this.moment.day(1).format(config.dateFormat);

            // Fetch
            fetch(
                urlFormat(this.url, {
                    id: this.id,
                    date: monday
                })
            )
                .then(res => res.json())
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject([]);
                });
        });
    }

}

export default AmicaScraper;
