import fetch from 'node-fetch';
import { apiRoot } from 'config';
const methods = ['get', 'post'];
const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class ApiClient {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'Cannot construct an object of ApiClient';
    }

    for (const method of methods) {
      this[method] = this.fetch.bind(this, method);
    }
  }

  static get client() {
    if (!this[singleton]) {
      this[singleton] = new ApiClient(singletonEnforcer);
    }

    return this[singleton];
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    return response.json().then(json => Promise.reject(json));
  }

  static parseJSON(response) {
    return response.json();
  }

  static prepareUrl(url) {
    const path = url.replace(/^\/|\/$/, '');
    return `${ apiRoot }/${ path }`;
  }

  fetch(method, url, { data, ...fetchOptions } = {}) {
    if (data) {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers = fetchOptions.headers || {};
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    return fetch(ApiClient.prepareUrl(url), {method, ...fetchOptions})
      .then(ApiClient.checkStatus)
      .then(ApiClient.parseJSON);
  }

  /**
   * @todo Submit a menu to the main backend
   * @param data
   */
  submitMenu(data) {

  }

  /**
   * Fetch list of venues
   */
  getVenues() {
    return this.get('venues');
  }
}

export const client = ApiClient.client;
