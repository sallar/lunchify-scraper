import {createScraper} from '../helpers/scraper';

export default class Venue {

    constructor(jsonData) {
        this.info = jsonData;
        this.scraper = createScraper(
            jsonData.provider,
            jsonData.provider_id
        );
        this.menu = [];
    }

    downloadMenu() {
        return this.scraper.getMenu().then(results => {
            this.menu = results;
            return this;
        });
    }

}
