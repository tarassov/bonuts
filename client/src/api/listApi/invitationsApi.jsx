import {post,get,del,put,request} from '../base/apiBaseOperations'

const INVITATIONS_URL = 'api/invitations'

export default class InvitationsApi {
    
    static itemName ='invitation'


    static addItem(token, item) {
      let body ={
        department_id: item.department ? item.department.id: null,
        ...item
      }
      return post(INVITATIONS_URL, body,token)
    }

    static loadItems(token,args) {
      if (args.my == true){
        return  get(INVITATIONS_URL+'/my', token)
      }       
      else{
        return  get(INVITATIONS_URL+'', token)
      }

  }
}
