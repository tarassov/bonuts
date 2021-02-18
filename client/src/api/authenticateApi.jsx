import {post, request} from './api'

const AUTH_URL  =  '/api/authenticate'
const DEMO_AUTH_URL  =  '/api/demo_authenticate'
const REGISTER_URL  =  '/api/register'
const VALIDATE_NEW_EMAIL_URL  =  '/api/validate_new_email'
const SECRET_URL= '/api/secret'

export default class AuthenticateApi {
    static authenticate(email, password) {
        let body = {email: email, password: password}
        return request(AUTH_URL,'POST',body,null,false)
    }

    static demo_authenticate() {
        let body = {}
        return request(DEMO_AUTH_URL,'POST',body,null,false)
    }

    static register(credentials) {
        let body = {
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            email: credentials.email,
            password: credentials.password,             
        }
        return post(REGISTER_URL, body)
    }


    static validateEmail(email) {
        let body = {email}
        return request(VALIDATE_NEW_EMAIL_URL, "POST", body,null,false)
    }


    static logout() {

    }


}
