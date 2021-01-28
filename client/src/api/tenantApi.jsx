
import {post,get,del,put,request} from './api'

const TENANT_BY_DOMAIN  =  '/api/tenant/show_by_domain'


export default class ProfileApi {

    static itemName ='tenant'

    static loadTenantByDomain(domain){
        return get(TENANT_BY_DOMAIN +'?domain=' + domain)
    }  
    
    static showTenant(token) {
        return get('/api/tenant/current',token)
    }


    static saveTenant(token, tenant) {
        let body = {
          ...tenant,                 
        }
        return put('/api/tenant/current', body,token)
    }

    static migrateAvatars(token) {
        return post('/api/tenant/migrate_avatars/',null,token)
    }

    static saveLogo(token,payload){
        let body =payload
        return request('/api/tenant/upload_logo/', "POST", body,token,false,true)
      }
}
