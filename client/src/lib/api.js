import RequestManager from './requestManager';

function Api(id, data) {
  this.id = id;
  this.data = data;
}

Api.prototype.List = {
  show: (id) => {
    return RequestManager.get(`lists/${id}`);
  },

  get: () => {
    return RequestManager.get('lists');
  },

  post: (data) => {
    return RequestManager.post('lists', data);
  },

  put: (id, data) => {
    return RequestManager.put(`lists/${id}`, data);
  },

  destroy: (id) => {
    return RequestManager.destroy(`lists/${id}`);
  }
};

Api.prototype.Username = {
  get: () => {
    return RequestManager.get('usernames');
  }
};

Api.prototype.Item = {
  get: (data) => {
    return RequestManager.getLoadOptions('items', data);
  },

  post: (data) => {
    return RequestManager.post('items', data);
  },

  destroy: (id) => {
    return RequestManager.destroy(`items/${id}`);
  }
};

Api.prototype.Token = {
  post: (data) => {
    return RequestManager.postAuthorize('tokens', data);
  }
};

Api.prototype.Signup = {
  post: (data) => {
    return RequestManager.postAuthorize('users', data);
  }
};

export default new Api();
