import * as providers from 'scrappers/providers';

export default class Venue {
  constructor(data) {
    this.data = data;
  }

  getProvider() {
    if (!providers[this.data.provider]) {
      throw `Provider ${ this.data.provider } not found.`;
    }

    return providers[this.data.provider];
  }

  scrapMenu() {
    return this.getProvider().scrapMenu(this.data);
  }
}