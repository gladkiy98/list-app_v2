import axios from 'axios';

class RequestManager {
  baseOptions = (method) => ({
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('jwt')
    }
  })

  baseLoadOptions = (method, params) => ({
    method,
    params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('jwt')
    }
  })

  authorizeOptions = (method) => ({
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  axiosReq(url, options) {
    return axios(`/api/${url}`, options);
  }

  getLoadOptions(url, params) {
    return this.axiosReq(url, this.baseLoadOptions('GET', params));
  }

  get(url) {
    return this.axiosReq(url, this.baseOptions('GET'));
  }

  postAuthorize(url, data) {
      return this.axiosReq(url, { ...this.authorizeOptions('POST'), data });
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

export default new RequestManager();
