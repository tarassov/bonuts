import departmentApi from "api/departmentApi"
import storeApi from "api/storeApi"
import regardApi from "api/regardApi"
import profilesApi from "./profilesApi"
import AccountLogApi from "./accountLogApi";
import schedulersApi from "api/schedulersApi";
import RequestApi from "./requestApi";
import PluginApi from "./pluginApi";

const apis ={
    departments: departmentApi,
    donuts: storeApi,
    regards: regardApi,
    profiles: profilesApi,
    account_log: AccountLogApi,
    schedulers: schedulersApi,
    requests: RequestApi,
    plugins: PluginApi,
}
export default apis