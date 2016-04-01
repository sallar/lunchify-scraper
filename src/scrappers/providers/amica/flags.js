const flagRegex = /\s\(([A-Z\s,\*]+)\)/ig;

/**
 * Extract the flags from food title
 * @param title
 */
export function extractFlags(title) {
  let result = flagRegex.exec(title)
  if (result) {
    let [, flags] = result;
    return flags
      .replace(/\s+/g, '').split(',')
      .map(flag => flag.toLowerCase())
      .filter(flag => flag !== "*");
  }
  return title;
}

/**
 * Removes flags from the title
 */
export function removeFlags(title) {
  return title.replace(flagRegex, '');
}
