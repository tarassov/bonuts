import {post,get,del,put,request} from './api'

const API_ENDPOINT = 'api/tenant_plugins'


export default class TenantPluginApi {
    
    static itemName ='tenantPlugin'
    
    static loadItems(token) {
      return  get(API_ENDPOINT, token)
    }

    static addItem(token, item) {
      let body = JSON.stringify({
        ...item
      })
      return post(API_ENDPOINT, body,token)
    }

    static updateItem(token, item) {
      let body = JSON.stringify({
        ...item
      })
      return put(API_ENDPOINT+'/'+item.id, body,token)
    }


  

}
