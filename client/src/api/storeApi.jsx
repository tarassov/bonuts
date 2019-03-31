import {post,get,del,put,request} from './api'

const DONUTS_URL = 'api/donuts'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'

export default class DashboardApi {
    static loadDonuts(token) {
      return  get(DONUTS_URL, token)
    }

    static postItem(token, item) {
       let body = JSON.stringify({...item})
       return post(DONUTS_URL, body,token)
    }

    static getItem(token, id){
      console.log(id);
      return  get(DONUTS_URL+'/' + id, token)
    }

}
