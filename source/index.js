/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
import logger from "./helpers/logger";
import {findVenues} from "./controllers/venues";

findVenues().then(function(venues) {
    logger.info(venues);
});
