import { post, get } from "../base/apiBaseOperations";

const REQUEST = "/api/requests";

const ACTIVATE_URL = "/api/regards/activate";
const CLOSE_URL = "/api/regards/close";
const ROLLBACK_URL = "/api/regards/rollback";
const REFUND_URL = "/api/regards/refund";

const PROFILE_ASSETS = "/api/requests";
export default class RequestsApi {
  static itemName = "request";

  static loadItems(token,args) {
    let url= REQUEST;
    if (args.filter !== undefined){
      if(args.filter.status === 1) {
        url  = REQUEST+ "?active=true"
      }
      else if(args.filter.status === 2) {
        url  = REQUEST+ "?archive=true"
      }
    }
    return get(url, token);
  }
  static getItem(token, id) {
    return get(PROFILE_ASSETS + "/" + id, token);
  }

  static addItem(token, regard) {
    let body = {
      ...regard,
    };
    return post(PROFILE_ASSETS, body, token);
  }

  static updateItem(token, regard) {
    let body = {
      ...regard,
    };
    console.log(regard)
    console.log(body)
    if (regard.deleted) return post(REFUND_URL, body, token)
    if (regard.status == 1) return post(ACTIVATE_URL, body, token);
    if (regard.status == 0) return post(ROLLBACK_URL, body, token);
    if (regard.status == 2) return post(CLOSE_URL, body, token);
  }
}
