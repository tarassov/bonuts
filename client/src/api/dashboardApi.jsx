import {post,get,del,put,request} from './api'

const USERS_URL = 'api/users'

export default class DashboardApi {
    static loadUsers(token) {
      return  get(USERS_URL, token)
    }
}
