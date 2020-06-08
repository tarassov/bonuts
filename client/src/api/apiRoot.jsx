import departmentApi from "api/departmentApi"
import storeApi from "api/storeApi"
import regardApi from "api/regardApi"
import profilesApi from "./profilesApi"
import AccountLogApi from "./accountLogApi";
import Schedulers from "layouts/Schedulers";
import schedulersApi from "api/schedulersApi";

const apis ={
    departments: departmentApi,
    donuts: storeApi,
    regards: regardApi,
    profiles: profilesApi,
    account_log: AccountLogApi,
    schedulers: schedulersApi,
}
export default apis