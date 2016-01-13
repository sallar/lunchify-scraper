/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
(function(module) {
    "use strict";

    const bunyan = require("bunyan");

    module.exports = bunyan.createLogger({
        name: "lunchify-scraper",
        stream: process.stdout
    });

})(module);
