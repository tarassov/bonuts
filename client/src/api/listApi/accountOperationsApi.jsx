import { get } from "api/base/apiBaseOperations";

const URL = "/api/account_operations";

export default class AccountOperationsApi {
  static itemName = "account_operation";

  static loadItems(token, args) {
    let queryString  = URL + "?account_id=" + args.filter.id + "&page=" + args.page
    return get(queryString,token)
  }

  static getItem(token, id) {
    return get(URL + "/" + id, token);
  }
}
