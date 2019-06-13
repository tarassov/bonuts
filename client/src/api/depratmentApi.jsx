import {post,get,del,put,request} from './api'

const DEPARTMENTS_URL = 'api/departments'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'
const REGARDS_URL ='api/profile_assets'

export default class DepartmentApi {
    static loadDepartments(token) {
      return  get(DEPARTMENTS_URL, token)
    }

    static addDepartment(token, name) {
      let body = JSON.stringify({name: name})
       return post(DEPARTMENTS_URL, body,token)
    }


  

}
