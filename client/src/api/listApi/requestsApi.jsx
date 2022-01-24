import { post, get } from "../base/apiBaseOperations";

const REQUEST = "/api/regards/requests";
const ACTIVATE_URL = "/api/regards/activate";
const CLOSE_URL = "/api/regards/close";
const ROLLBACK_URL = "/api/regards/rollback";
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

  static updateItem(token, regard) {
    let body = {
      ...regard,
    };
    console.log(regard)
    console.log(body)
    if (regard.status == 1) return post(ACTIVATE_URL, body, token);
    if (regard.status == 0) return post(ROLLBACK_URL, body, token);
    if (regard.status == 2) return post(CLOSE_URL, body, token);
  }
}
