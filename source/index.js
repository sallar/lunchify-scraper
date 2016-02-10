/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
import logger from "./helpers/logger";
import {
    findVenues,
    downloadMenus,
    saveMenus
} from "./controllers/venues";

    findVenues()
        .then(downloadMenus)
        .then(saveMenus)
        .then(r => {
            logger.info(JSON.stringify(r, undefined, 4));
        }).catch(error => {
            logger.error(error);
        });
