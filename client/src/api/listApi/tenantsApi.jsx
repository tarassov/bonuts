import {post,get,del,put,request} from '../base/apiBaseOperations'

const TENANTS_URL = 'api/tenants'

export default class ProfilesApi {
    
    static itemName ='tenant'

    static loadItems(token,args) {
        if (args.domain){
          //return  get(TENANTS_URL+'?domain='+ args.domain, token)
          return  get(TENANTS_URL+'/accessible', token)
        }       
    }

   

}
