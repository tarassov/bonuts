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

  static getItem(token) {
    return TenantAdminApi.showTenant(token)
  }

  static updateItem(token, item) {
    let body = new FormData();
    body.append ("name", item.name)
    body.append ("caption", item.caption)
    body.append ("domain", item.domain)
    body.append ("welcome_points", item.welcome_points)
    body.append ("welcome_donuts", item.welcome_donuts)
    body.append ("email_notification", item.email_notification)
    body.append ("use_departments", item.use_departments)
    body.append ("join_to_project_donuts", item.join_to_project_donuts)
    body.append ("birthday_donuts", item.birthday_donuts)
    body.append ("join_to_company_donuts", item.join_to_company_donuts)
    if (item.logoChanged) body.append ("logo", item.logo)
    return request("/api/tenant/current", "PUT", body, token, true, true);
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
