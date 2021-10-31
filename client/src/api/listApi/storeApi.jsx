import { post,request, get, del, put } from "api/base/apiBaseOperations";

const DONUTS_URL = "api/donuts";

export default class StoreApi {
  static itemName = "donut";

  static loadItems(token) {
    return get(DONUTS_URL, token);
  }

  static loadDounts(token) {
    return get(DONUTS_URL, token);
  }

  static postItem(token, payload) {
    let body = payload;
    return request(DONUTS_URL, "POST", body, token, true, true);
  }

  static getItem(token, id) {
    return get(DONUTS_URL + "/" + id, token);
  }

  static updateItem(token, item) {
    let body = { ...item };
    return put(DONUTS_URL + "/" + item.id, body, token);
  }

  static removeItem(token, id) {
    return del(DONUTS_URL + "/" + id, token);
  }
  static check_donut_name(token, name){
    return get(DONUTS_URL + "/check_donut_name?name=" +name, token,false);
  }
}
