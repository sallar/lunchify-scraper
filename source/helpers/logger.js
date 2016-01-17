/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
import bunyan from "bunyan";

let __sharedInstance;

function getSharedInstance() {
    if (!__sharedInstance) {
        __sharedInstance = bunyan.createLogger({
            name: "lunchify-scraper",
            stream: process.stdout
        })
    }

    return __sharedInstance;
}

export default getSharedInstance();
