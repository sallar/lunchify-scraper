import _ from "lodash";
const flagsRegex = /(\b[g|vl|v|l|vs|m|a|veg]{1,2}\b)/ig;

/**
 * Extract the flags from food title
 * @param title
 */
export function extractFlags(title) {
  let match = title.match(flagsRegex);
  if (match) {
    return _.uniq(match).map(flag => flag.toLowerCase());
  }
  return [];
}

/**
 * Removes flags from the title
 */
export function removeFlags(title) {
  return title
    .trim()
    .replace(flagsRegex, '')
    .replace(/,{2,}/ig, ',')
    .replace(/(\s{2,})/ig, ' ')
    .replace(/[,&\s]+$/ig, '')
    .replace(/\s,\s/ig, ', ');
}
