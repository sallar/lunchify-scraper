export default class Scraper {

    construct(id) {
        this.id = id;
    }

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
