import axios from 'axios';

class API {
  baseOptions = (method) => {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : localStorage.getItem('jwt')
      }
    };
  };

  axiosReq(url, options) {
    return axios(`/api/${url}`, options);
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

export default new API();
