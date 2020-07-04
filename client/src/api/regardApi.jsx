
import {post,get,del,put,request} from './api'


const ACTIVATE_URL ='/api/regards/activate'
const PROFILE_ASSETS = 'api/profile_assets'


export default class RegardApi {

     
    static itemName ='regard'

    static loadItems(token){
        return get(PROFILE_ASSETS, token)
    }

    static updateItem(token, regard) {
        let body = JSON.stringify({
            ...regard
          })
        return  post(ACTIVATE_URL, body,token)
    }
    static addItem(token, regard) {
        let body = JSON.stringify({
            ...regard
          })
        return post(PROFILE_ASSETS, body, token)  
      }


}