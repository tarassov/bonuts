import {post,get,del,put,request} from './api'

const SCHEDULERS_API = 'api/donuts_schedulers'


export default class ScheduilersApi {
    
    static itemName ='scheduler'
    
    static loadItems(token) {
      return  get(SCHEDULERS_API, token)
    }

    static addItem(token, item) {
      let body = JSON.stringify({
        ...item
      })
      return post(SCHEDULERS_API, body,token)
    }

    static updateItem(token, item) {
      let body = JSON.stringify({
        ...item
      })
      return put(SCHEDULERS_API+'/'+item.id, body,token)
    }


  

}
