import { post, get, put } from "api/base/apiBaseOperations";

const API_ENDPOINT = "api/tenant_plugins";

export default class TenantPluginsApi {
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
    let tenant_settings = Object.keys(item).reduce((object, key) => {
      if (item.settings.map((x) => x.name).includes(key)) {
        object[key] = item[key];
      }
      return object;
    }, {});

    let body = {
      id: item.id,
      name: item.name,
      active: item.active,
      tenant_settings,
    };
    return put(API_ENDPOINT + "/" + item.id, body, token);
  }
}
