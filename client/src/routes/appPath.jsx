import Dashboard from "@material-ui/icons/Dashboard";

export default class AppPath{
    default_props = {
        path:"",
        redirect: false,
        anonymous: false,
        authenticated:  true,
        connected: true,
        admin: false,
        hideInMenu: false,
        icon: Dashboard,
        active: true,    
    }
    
    #path = this.default_props.path
    #authenticated = this.default_props.authenticated
    #admin = this.default_props.admin
    #active = this.default_props.active
    #anonymous = this.default_props.anonymous



    constructor(props) {
       this.config = {...this.default_props,...props}
       this.#path = this.config.path
       this.#authenticated =  this.config.authenticated === undefined? false : this.config.authenticated
       this.#active =  this.config.active === undefined? false : this.config.active
       this.#admin =  this.config.admin === undefined? false : this.config.admin
       this.#anonymous =  this.config.anonymous === undefined? false : this.config.anonymous
    }

    get path(){
        return this.#path
    }
    get authenticated(){
        return this.#authenticated
    }

    get active(){
        return this.#active
    }

    get admin(){
        return this.#admin
    }
    get anonymous(){
        return this.#anonymous
    }

    getConfig = () =>{
        return this.config
    }
}