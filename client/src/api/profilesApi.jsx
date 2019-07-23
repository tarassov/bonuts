import {post,get,del,put,request} from './api'

const PROFILES_URL = 'api/profiles'

export default class ProfilesApi {
    
    static itemName ='profile'

    static loadItems(token,args) {
        if (args.show_score !== undefined){
          return  get(PROFILES_URL+'?show_score='+ args.show_score, token)
        }
        else {
          return  get(PROFILES_URL, token)
        }
    }

    static addItem(token, item) {
      let body = JSON.stringify({
        department_id: item.department ? item.department.id: null,
        position: item.position
      })
      return post(PROFILES_URL, body,token)
    }

    static updateItem(token, item) {
        let body = JSON.stringify({
          ...item,  
          department_id: item.department ? item.department.id: null,            
        })
        return put(PROFILES_URL+'/'+item.id, body,token)
    }


  

}
