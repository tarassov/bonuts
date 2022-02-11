import departmentApi from "api/listApi/departmentsApi";
import storeApi from "api/listApi/storeApi";

import profilesApi from "api/listApi/profilesApi";
import AccountOperationsApi from "api/listApi/accountOperationsApi";
import schedulersApi from "api/listApi/schedulersApi";
import RequestsApi from "api/listApi/requestsApi";
import PluginsApi from "api/listApi/pluginsApi";
import TenantPluginsApi from "api/listApi/tenantPluginsApi";
import TenantsApi from "api/listApi/tenantsApi";
import InvitationsApi from "api/listApi/invitationsApi";

const apis = {
  departments: departmentApi,
  donuts: storeApi,
  profiles: profilesApi,
  account_operations: AccountOperationsApi,
  schedulers: schedulersApi,
  requests: RequestsApi,
  plugins: PluginsApi,
  tenant_plugins: TenantPluginsApi,
  tenants: TenantsApi,
  invitations: InvitationsApi,
};
export default apis;
