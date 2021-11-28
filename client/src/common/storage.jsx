export default class Storage {
  static getToken() {
    return localStorage.getItem("auth_token");
  }

  static getTenant() {
    return localStorage.getItem("tenant");
  }

  static removeItems() {
    localStorage.removeItem("tenant");
    localStorage.removeItem("auth_token");
  }

  static setTenant(tenants) {
    if (Array.isArray(tenants)) {
      if (tenants.length === 1) {
        localStorage.setItem("tenant", tenants[0]);
        return tenants[0];
      }
    } else {
      localStorage.setItem("tenant", tenants); //to be compatible with previous versions
      return tenants;
    }
    return undefined;
  }

  static setToken(auth_token) {
    localStorage.setItem("auth_token", auth_token);
  }
}
