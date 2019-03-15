import {post,get,del,put,request} from './api'

const DONUTS_URL = 'api/donuts'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'

export default class DashboardApi {
    static loadDonuts(token) {
      return  get(DONUTS_URL, token)
    }

}
