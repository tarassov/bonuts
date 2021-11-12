import { get,  put } from "../base/apiBaseOperations";

const PROFILES_URL = "api/profiles";

export default class ProfilesApi {
  static itemName = "profile";

  static loadItems(token, args) {
    if (args.show_score) {
      return get(PROFILES_URL + "?show_score=" + args.show_score, token);
    } else if (args.show_balance) {
      return get(PROFILES_URL + "?show_balance=" + args.show_balance, token);
    } else if (args.show_sent) {
      return get(PROFILES_URL + "?show_sent=" + args.show_sent, token);
    } else {
      return get(PROFILES_URL, token);
    }
  }



  static updateItem(token, item) {
    let body = {
      ...item,
      department_id: item.department ? item.department.id : null,
    };
    return put(PROFILES_URL + "/" + item.id, body, token);
  }
}
