import { post, get,  put} from "api/base/apiBaseOperations";

const SCHEDULERS_API = "api/donuts_schedulers";

export default class ScheduilersApi {
  static itemName = "scheduler";

  static loadItems(token) {
    return get(SCHEDULERS_API, token);
  }

  static addItem(token, item) {
    let body = {
      ...item,
    };
    return post(SCHEDULERS_API, body, token);
  }

  static updateItem(token, item) {
    let body = {
      ...item,
    };
    return put(SCHEDULERS_API + "/" + item.id, body, token);
  }
}
