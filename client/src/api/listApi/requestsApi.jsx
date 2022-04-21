import { post, get } from "../base/apiBaseOperations";

const REQUEST = "/api/requests";

const ACTIVATE_URL = "/api/requests/activate";
const CLOSE_URL = "/api/requests/close";
const ROLLBACK_URL = "/api/requests/rollback";
const REFUND_URL = "/api/requests/refund";

const PROFILE_ASSETS = "/api/requests";
export default class RequestsApi {
  static itemName = "request";

  static loadItems(token,args) {
    let url= REQUEST;
    if (args.filter !== undefined){
      url  = url+ "?";
      if(args.filter.status === 1) {
        url  = url+ "active=true&"
      }
      else if(args.filter.status === 2) {
        url  = url+ "archive=true&"
      }
      if (args.filter.my){
        url  = url+ "my=true"
      }
    }

    return get(url, token);
  }
  static getItem(token, id) {
    return get(PROFILE_ASSETS + "/" + id, token);
  }

  static addItem(token, request) {
    let body = {
      ...request,
    };
    return post(PROFILE_ASSETS, body, token);
  }

  static updateItem(token, request) {
    let body = {
      ...request,
    };
    console.log(request)
    console.log(body)
    if (request.deleted) return post(REFUND_URL, body, token)
    if (request.status == 1) return post(ACTIVATE_URL, body, token);
    if (request.status == 0) return post(ROLLBACK_URL, body, token);
    if (request.status == 2) return post(CLOSE_URL, body, token);
  }
}
