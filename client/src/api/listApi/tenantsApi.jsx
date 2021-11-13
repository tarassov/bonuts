import {  get } from "../base/apiBaseOperations";

const TENANTS_URL = "api/tenants";

export default class ProfilesApi {
  static itemName = "tenant";

  static loadItems(token, args) {
    if (args.accessible == true) {
      //return  get(TENANTS_URL+'?domain='+ args.domain, token)
      return get(TENANTS_URL + "/accessible", token);
    } else {
      return get(TENANTS_URL + "", token);
    }
  }
}
