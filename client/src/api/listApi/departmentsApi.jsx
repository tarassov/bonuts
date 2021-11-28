import { post, get, put } from "../base/apiBaseOperations";

const DEPARTMENTS_URL = "api/departments";

export default class DepartmentApi {
  static itemName = "department";

  static loadItems(token) {
    return get(DEPARTMENTS_URL, token);
  }

  static addItem(token, item) {
    let body = {
      name: item.name,
      head_profile_id: item.head_profile ? item.head_profile.id : null,
    };
    return post(DEPARTMENTS_URL, body, token);
  }

  static updateItem(token, item) {
    let body = {
      name: item.name,
      head_profile_id: item.head_profile ? item.head_profile.id : null,
    };
    return put(DEPARTMENTS_URL + "/" + item.id, body, token);
  }
}
