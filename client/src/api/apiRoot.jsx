import departmentApi from "api/departmentApi"
import storeApi from "api/storeApi"
import regardApi from "api/regardApi"
import profilesApi from "./profilesApi"

const apis ={
    departments: departmentApi,
    stores: storeApi,
    regards: regardApi,
    profiles: profilesApi
}
export default apis