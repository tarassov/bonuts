import {post,get,del,put,request} from './api'

const DONUTS_URL = 'api/donuts'


export default class DashboardApi {
   
  static itemName ='donut'

    static loadItems(token) {
      return  get(DONUTS_URL, token)
    }

    static  loadDounts(token) {
      return  get(DONUTS_URL, token)
    }

    static postItem(token, item) {
       let body = {...item}
       return post(DONUTS_URL, body,token)
    }

    static getItem(token, id){
      return  get(DONUTS_URL+'/' + id, token)
    }

    static updateItem(token, item){
      let body = {...item}
      return put(DONUTS_URL+'/' + item.id, body,token)
    }

    static removeItem(token, id) {
      return  del(DONUTS_URL+'/' + id, token)
    }

}
