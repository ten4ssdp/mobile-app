import deburr from 'lodash.deburr';

import { BASE_API_URL } from './constant';

class Http {
  constructor(BASE_URL) {
    this.BASE_URL = BASE_URL;
  }

  async get(path, headers) {
    try {
      const res = await fetch(`${this.BASE_URL}/${path}`, {
        headers
      });
      return await res.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async post(path, body, { headers, isUpdate }) {
    try {
      const method = isUpdate ? 'PUT' : 'POST';

      const res = await fetch(`${this.BASE_URL}/${path}`, {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          ...headers
        }
      });

      if (res.status === 400) {
        return await res.json();
      }
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getLatLong(address) {
    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${deburr(address)}&type=street`
      );
      const decoded = await res.json();
      const [long, lat] = await decoded.features[0].geometry.coordinates;
      return { lat, long };
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Http(`${BASE_API_URL}/api`);
