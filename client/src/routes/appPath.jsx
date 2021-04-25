import Dashboard from "@material-ui/icons/Dashboard";

export default class AppPath{
   
   
    default_props = {
        redirect: false,
        anonymous: false,
        authenticated:  true,
        connected: true,
        admin: true,
        icon: Dashboard,
        active: true,   
        hideInMenu: false,   
    }


    constructor(props) {
       this.config = {...this.default_props,...props}
       this.component = this.config.component
       this.icon = this.config.icon
    }

    getConfig = () =>{
        return this.config
    }
}