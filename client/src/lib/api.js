import Manager from './manager';

class API {
  getList(id) {
    return Manager.get(`lists/${id}`);
  }

  getLists() {
    return Manager.get('lists');
  }

  postList(data) {
    return Manager.post('lists', data);
  }

  putList(id, data) {
    return Manager.put(`lists/${id}`, data);
  }

  destroyList(id) {
    return Manager.destroy(`lists/${id}`);
  }

  getItems(data) {
    return Manager.getLoadOptions('items', data);
  }

  postItem(data) {
    return Manager.post('items', data);
  }

  destroyItem(id) {
    return Manager.destroy(`items/${id}`);
  }
}

export default new API();
