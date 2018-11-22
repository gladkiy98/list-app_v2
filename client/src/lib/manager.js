import axios from 'axios';

class Manager {
  baseOptions = (method) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('jwt')
      }
    };
  };

  baseLoadOptions = (method, params) => {
    return {
      method,
      params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('jwt')
      }
    };
  };

  axiosReq(url, options) {
    return axios(`/api/${url}`, options);
  }

  getLoadOptions(url, params) {
    return this.axiosReq(url, this.baseLoadOptions('GET', params));
  }

  get(url) {
    return this.axiosReq(url, this.baseOptions('GET'));
  }

  post(url, data) {
    return this.axiosReq(url, { ...this.baseOptions('POST'), data });
  }

  put(url, data) {
    return this.axiosReq(url, { ...this.baseOptions('PUT'), data });
  }

  destroy(url) {
    return this.axiosReq(url, this.baseOptions('DELETE'));
  }
}

export default new Manager();
