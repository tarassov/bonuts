export default class Storage {
    static getToken() {
        return localStorage.getItem('auth_token')
    }

    static getTenant() {    
        return localStorage.getItem('tenant')
    }

}
