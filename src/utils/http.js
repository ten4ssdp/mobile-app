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

  async post(path, body, headers) {
    try {
      const res = await fetch(`${this.BASE_URL}/${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          ...headers
        }
      });
      return await res.json();
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new Http('http://3.10.224.110:5000/api');
