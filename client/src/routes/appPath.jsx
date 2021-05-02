import Dashboard from "@material-ui/icons/Dashboard";

export default class AppPath{
   
   
    default_props = {
        redirect: false,
        anonymous: false,
        authenticated:  true,
        connected: true,
        admin: false,
        hideInMenu: false,
        icon: Dashboard,
        active: true,    
    }


    constructor(props) {
       this.config = {...this.default_props,...props}
       this.component = this.config.component
       this.icon = this.config.icon
       this.path = this.config.path
    }

    getConfig = () =>{
        return this.config
    }
}