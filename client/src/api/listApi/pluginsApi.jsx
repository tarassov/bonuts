import { post, get, put } from "api/base/apiBaseOperations";

const API_ENDPOINT = "api/plugins";

export default class PluginsApi {
  static itemName = "plugin";

  static loadItems(token) {
    return get(API_ENDPOINT, token);
  }

  static addItem(token, item) {
    let body = {
      ...item,
    };
    return post(API_ENDPOINT, body, token);
  }

  static updateItem(token, item) {
    let body = {
      ...item,
    };
    return put(API_ENDPOINT + "/" + item.id, body, token);
  }
}
