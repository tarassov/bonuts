import departmentApi from "api/listApi/departmentsApi"
import storeApi from "api/listApi/storeApi"
import regardApi from "api/listApi/regardsApi"
import profilesApi from "api/listApi/profilesApi"
import AccountOperationsApi from "api/listApi/accountOperationsApi";
import schedulersApi from "api/listApi/schedulersApi";
import RequestsApi from "api/listApi/requestsApi";
import PluginsApi from "api/listApi/pluginsApi";
import TenantPluginsApi from "api/listApi/tenantPluginsApi";

const apis ={
    departments: departmentApi,
    donuts: storeApi,
    regards: regardApi,
    profiles: profilesApi,
    account_operations: AccountOperationsApi,
    schedulers: schedulersApi,
    requests: RequestsApi,
    plugins: PluginsApi,
    tenant_plugins: TenantPluginsApi,
}
export default apis