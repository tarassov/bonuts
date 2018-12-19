export default class Storage {
    static getToken() {
        return localStorage.getItem('auth_token')
    }

}
