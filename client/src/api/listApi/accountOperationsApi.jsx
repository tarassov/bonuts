import { get } from "api/base/apiBaseOperations";

const URL = "/api/account_operations";

export default class AccountOperationsApi {
  static itemName = "account_operation";

  static loadItems(token, args) {
    if (args.page !== undefined) {
      return get(URL + "?account_id=" + args.id + "&page=" + args.page, token);
    }
    return get(URL + "?account_id=" + args.id + "&page=1", token);
  }

  static getItem(token, id) {
    return get(URL + "/" + id, token);
  }
}
