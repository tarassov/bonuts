import { post, get, del, put, request } from "./base/apiBaseOperations";

const TENANT_BY_DOMAIN = "/api/tenant/show_by_domain";

export default class TenantAdminApi {
  static itemName = "tenant";

  static showTenant(token) {
    return get("/api/tenant/current", token);
  }

  static saveTenant(token, tenant) {
    let body = {
      ...tenant,
    };
    return put("/api/tenant/current", body, token);
  }

  static saveLogo(token, payload) {
    let body = payload;
    return request(
      "/api/tenant/upload_logo/",
      "POST",
      body,
      token,
      false,
      true
    );
  }
}
