import {post,get,del,put,request} from './api'

const USERS_URL = 'api/users'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'

export default class DashboardApi {
    static loadUsers(token) {
      return  get(USERS_URL, token)
    }

    static sendPoints(token, amount, from_account_id, to_user_ids,comment) {
      let body = JSON.stringify({ amount,to_user_ids: to_user_ids, from_account_id,comment})
       return post(SEND_POINT_URL, body,token)
    }


    static loadEvents(token,page) {
        return get(EVENTS_URL+'?page=' + page, token)
    }

}
