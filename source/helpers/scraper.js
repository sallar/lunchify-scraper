import {
    LounaatScraper,
    AmicaScraper
} from "../models/scrapers";

export function createScraper(providerName, providerId) {
    let scraper;

    switch (providerName) {
        case "amica":
            scraper = AmicaScraper;
            break;
        case "lounaat":
            scraper = LounaatScraper;
            break;
        default:
            throw Error("Wrong Provider");
            break;
    }

    return new scraper(providerId);
}

export function urlFormat(str, replace) {
    Object.keys(replace).forEach(key => {
        str = str.replace(`[${key.toUpperCase()}]`, replace[key]);
    });

    return str;
}
