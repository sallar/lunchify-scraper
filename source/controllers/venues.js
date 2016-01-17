/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 13.01.2016
 */
"use strict";

import {apiUrl} from "../config";
import fetch from "node-fetch";

module.exports = {
    findAll: function() {
        return fetch(apiUrl + "/venues").then(function(res) {
            return res.json();
        });
    }
};
