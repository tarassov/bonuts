import Dashboard from "@material-ui/icons/Dashboard";

export default class AppPath {
  default_props = {
    path: "",
    redirect: false,
    root: false,
    anonymous: false,
    authenticated: true,
    connected: true,
    admin: false,
    store_admin: false,
    hideInMenu: false,
    icon: Dashboard,
    active: true,
    tenantNotRequired: false,
    settingsRoute: false,
  };

  //private fields
  #path = this.default_props.path;
  #authenticated = this.default_props.authenticated;
  #admin = this.default_props.admin;
  #store_admin = this.default_props.store_admin;
  #active = this.default_props.active;
  #anonymous = this.default_props.anonymous;
  #tenantNotRequired = this.default_props.tenantNotRequired;
  #root = this.default_props.root;
  #settingsRoute = this.default_props.settingsRoute;

  constructor(props) {
    this.config = { ...this.default_props, ...props };
    this.#path = this.config.path;
    this.#authenticated =
      this.config.authenticated === undefined
        ? false
        : this.config.authenticated;
    this.#active =
      this.config.active === undefined ? false : this.config.active;
    this.#admin = this.config.admin === undefined ? false : this.config.admin;
    this.#store_admin = this.config.store_admin === undefined ? false : this.config.store_admin;
    this.#root = this.config.root === undefined ? false : this.config.root;
    this.#anonymous =
      this.config.anonymous === undefined ? false : this.config.anonymous;
    if (this.#anonymous) {
      this.#tenantNotRequired = true;
    } else {
      this.#tenantNotRequired = this.config.tenantNotRequired;
    }
  }

  get path() {
    return this.#path;
  }
  get authenticated() {
    return this.#authenticated;
  }

  get active() {
    return this.#active;
  }

  get admin() {
    return this.#admin;
  }

  get store_admin() {
    return this.#store_admin;
  }

  get anonymous() {
    return this.#anonymous;
  }

  get root() {
    return this.#root;
  }

  get tenantNotRequired() {
    return this.#tenantNotRequired;
  }

  get settingsRoute() {
    return this.#settingsRoute;
  }

  getConfig = () => {
    return this.config;
  };
}
