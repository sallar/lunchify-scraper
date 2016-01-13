/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
(function() {
    "use strict";

    const logger = require(__dirname + "/helpers/logger");
    const venues = require(__dirname + "/controllers/venues");

    venues.findAll().then(function() {
        logger.info("Hi!");
    });

})();
