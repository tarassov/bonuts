
import {post,get,del,put,request} from './api'

const TENANT_BY_DOMAIN  =  '/api/tenant/show_by_domain'


export default class ProfileApi {

    static itemName ='tenant'

    static loadTenantByDomain(domain){
        return get(TENANT_BY_DOMAIN +'?domain=' + domain)
    }   
}
