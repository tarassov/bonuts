import {request, get, del } from "api/base/apiBaseOperations";

const DONUTS_URL = "/api/donuts";

export default class StoreApi {
  static itemName = "donut";

  static loadItems(token) {
    return get(DONUTS_URL, token);
  }

  static loadDounts(token, all) {
    return get(DONUTS_URL+`?all=${all}`, token);
  }

  static postItem(token, payload) {
    let body = payload;
    return request(DONUTS_URL, "POST", body, token, true, true);
  }

  static getItem(token, id) {
    return get(DONUTS_URL + "/" + id, token);
  }

  /**
   * Update donut endpoint
   * @param {string} token  Auth token
   * @param {object} item  Use {logoChanged = true} to update logo
   * @returns  Promise
   */
  static updateItem(token, item) {
    let body = new FormData();
    body.append ("name", item.name)
    body.append ("price", item.price)
    body.append ("on_stock", item.on_stock)
    body.append ("supply_days", item.supply_days)
    body.append ("active", item.active)
    body.append ("description", item.description)
    body.append ("expiration_date", item.expiration_date)
    if (item.logoChanged) body.append ("logo", item.logo)
    return request(DONUTS_URL+ "/" + item.id, "PUT", body, token, true, true);
  }

  static removeItem(token, id) {
    return del(DONUTS_URL + "/" + id, token);
  }
  static check_donut_name(token, name){
    return get(DONUTS_URL + "/check_donut_name?name=" +name, token,false);
  }
}
