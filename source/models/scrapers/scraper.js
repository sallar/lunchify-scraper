export default class Scraper {

    constructor(id) {
        this.id = id;
    }

    /**
     * Get menu for this scraper
     * @return {Array.<Object>} Array of menu objects. Each has date as key (YYYY-MM-DD) and menu items as values
     */
    getMenu() {
        return new Promise(resolve => {
            resolve([{
                "2016-01-20": [
                    {
                        "title": "Some food",
                        "lang": "en"
                    }
                ]
            }]);
        });
    }

}
