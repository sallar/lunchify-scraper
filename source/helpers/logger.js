/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
"use strict";

import bunyan from "bunyan";

export default bunyan.createLogger({
    name: "lunchify-scraper",
    stream: process.stdout
});
