import { post, get, put } from "./base/apiBaseOperations";

const USERS_URL = "/api/profiles";
const SEND_POINT_URL = "/api/account_operations";
const EVENTS_URL = "/api/events";
const ADMIN_DEPOSIT = "/api/admin_deposit";

export default class DashboardApi {
  static loadUsers(token) {
    return get(USERS_URL, token);
  }

  static sendPoints(
    token,
    amount,
    from_profile_id,
    to_profile_ids,
    comment,
    is_for_distrib,
    share_for_all,
    burn_old,
    to_self_account
  ) {
    let body = {
      amount,
      to_profile_ids: to_profile_ids,
      from_profile_id,
      comment,
      is_for_distrib,
      share_for_all,
      burn_old,
      to_self_account,
    };
    return post(SEND_POINT_URL, body, token);
  }

  static adminDeposit(token, to_profile_ids, amount, comment, account_type) {
    let body = { amount, to_profile_ids: to_profile_ids, comment,account_type };
    return post(ADMIN_DEPOSIT, body, token);
  }

  static loadEvents(token, page, filter = {}) {
    let filterString = "";
    if (filter.showMine) {
      filterString = filterString + "&showMine=true";
    }
    return get(EVENTS_URL + "?page=" + page + filterString, token);
  }

  static loadEventWithComment(token, id) {
    return get(EVENTS_URL + "/" + id, token);
  }

  static likeEvent(token, event) {
    let body = {
      like: true,
    };
    return put(EVENTS_URL + "/" + event.id, body, token);
  }

  static commentItem(token, event, comment) {
    let body = {
      text: comment,
    };
    if (comment === "" || comment === undefined)
      return Promise.reject("Can not be empty");
    return post(EVENTS_URL + "/" + event.id + "/comments", body, token);
  }
}
