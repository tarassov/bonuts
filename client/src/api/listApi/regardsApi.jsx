import { post, get } from "../base/apiBaseOperations";

const ACTIVATE_URL = "/api/regards/activate";
const PROFILE_ASSETS = "/api/profile_assets";

export default class RegardsApi {
  static itemName = "regard";

  static loadItems(token) {
    return get(PROFILE_ASSETS, token);
  }

  static getItem(token, id) {
    return get(PROFILE_ASSETS + "/" + id, token);
  }

  static updateItem(token, regard) {
    let body = {
      ...regard,
    };
    return post(ACTIVATE_URL, body, token);
  }
  static addItem(token, regard) {
    let body = {
      ...regard,
    };
    return post(PROFILE_ASSETS, body, token);
  }
}
