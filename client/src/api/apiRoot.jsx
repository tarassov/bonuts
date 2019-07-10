import departmentApi from "api/departmentApi"
import storeApi from "api/storeApi"
import regardApi from "api/regardApi"
import profilesApi from "./profilesApi"
import AccountLogApi from "./accountLogApi";

const apis ={
    departments: departmentApi,
    donuts: storeApi,
    regards: regardApi,
    profiles: profilesApi,
    account_log: AccountLogApi
}
export default apis