import {post,get,del,put,request} from './api'

const DEPARTMENTS_URL = 'api/departments'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'
const REGARDS_URL ='api/profile_assets'

export default class DepartmentApi {
    
    static itemName ='department'
    
    static loadItems(token) {
      return  get(DEPARTMENTS_URL, token)
    }

    static addItem(token, item) {
      let body = JSON.stringify({name: item.name})
      return post(DEPARTMENTS_URL, body,token)
    }

    static updateItem(token, item) {
      let body = JSON.stringify({
        name: item.name, 
        head_user_id: item.head_user ? item.head_user.id: null
      })
      return put(DEPARTMENTS_URL+'/'+item.id, body,token)
    }


  

}
