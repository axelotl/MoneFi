import axios from "axios";
import debug from "sabio-debug";
import * as helper from '../services/serviceHelpers';



const _logger = debug.extend("LicenseService");
const endpoint = `${helper.API_HOST_PREFIX}/api/licenses`;


const getLicensePagination = (pageIndex, pageSize) => {
    _logger("Getting paginated licenses")
    const config = {
        method: "GET",
        url: `${endpoint}?pageindex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
    
}
const addLicense = (payload) => {
    _logger("Getting paginated licenses")
    const config = {
        method: "POST",
        data:payload,
        url: `${endpoint}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
    
}

const editLicense = (payload,id) => {
    _logger("Getting paginated licenses",payload,id)
    const config = {
        method: "PUT",
        data:payload,
        url: `${endpoint}/${id}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
    
}

const LicenseService={getLicensePagination,addLicense,editLicense}

export default LicenseService