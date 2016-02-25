const foodsFlags = [
  {
    flag: 'g',
    regex: /\bg\b/ig
  },
  {
    flag: 'v',
    regex: /\bv\b/ig
  },
  {
    flag: 'vl',
    regex: /\bvl\b/ig
  },
  {
    flag: 'l',
    regex: /\bl\b/ig
  },
  {
    flag: 'vs',
    regex: /\bvs\b/ig
  },
  {
    flag: 'm',
    regex: /\bm\b/ig
  }
];

export default foodsFlags;

/**
 * Extract a flag from food title
 * @param title
 */
export function extractFlags(title) {
  return foodsFlags
    .map(({regex, flag}) => regex.test(title) ? flag : null)
    .filter(flag => flag);
}

/**
 * Removes flags from the title
 */
export function removeFlags(title) {
  return foodsFlags
    .reduce((string, {regex}) => string.replace(regex, ''), title)
    .replace(/\s+/g, ' ')
    .trim();
}