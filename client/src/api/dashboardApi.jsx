import {post,get,del,put,request} from './api'

const USERS_URL = 'api/users'
const SEND_POINT_URL = 'api/account_operations'

export default class DashboardApi {
    static loadUsers(token) {
      return  get(USERS_URL, token)
    }

    static sendPoints(token, amount, from_account_id, to_account_id) {
      let body = JSON.stringify({ amount,to_account_id, from_account_id })
      console.log(body)
      return post(SEND_POINT_URL, body,token)
    }
}
