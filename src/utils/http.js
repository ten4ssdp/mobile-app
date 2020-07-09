import config from '../../config/env.config';

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
}

export default new Http(`${config.production.BASE_URL}/api`);
