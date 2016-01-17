/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
"use strict";

import logger from "./helpers/logger";
import venues from "./controllers/venues";

venues.findAll().then(function(venues) {
    logger.info(venues);
});
