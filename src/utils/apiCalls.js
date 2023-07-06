import axios from "axios";
import { responseCode, errorMsg } from '../constants/constants';


export const getRequest = (path, args = null) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${path}`, args ? getArguments(args) : getHeaders())
            .then(response => { resolve(response) })
            .catch(error => { reject(handleExceptionMessage(error)) });
    });
};

export const postRequest = (path, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${path}`, data, getHeaders())
            .then(response => { resolve(response) })
            .catch(error => { reject(handleExceptionMessage(error)) });
    });
};

export const handleExceptionMessage = (err) => {
    let errMessage = errorMsg.MSG_DEFAULT_ERROR_MESSAGE;
    let errCode = err.response.status;
    if (err.code === responseCode.NETWORK_ERROR) { errMessage = errorMsg.MSG_SERVICE_UNAVAILABLE; errCode = responseCode.SERVICE_UNAVAILABLE }
    if (err.response.status === responseCode.NO_DATA) { errMessage = errorMsg.MSG_NO_DATA_FOUND }
    if (err.response.status === responseCode.SERVER_ERROR) { errMessage = errorMsg.MSG_SERVER_ERROR }
    if (err.response.status === responseCode.PAGE_NOT_FOUND) { errMessage = errorMsg.MSG_PAGE_NOT_FOUND }
    if (err.response.status === responseCode.CLIENT_ERROR) { errMessage = errorMsg.MSG_SERVER_ERROR }
    if (err.response.status === responseCode.UN_AUTHORIZED) { errMessage = errorMsg.MSG_UN_AUTHORIZED }
    if (err.response.status === responseCode.BAD_REQUEST) { errMessage = (err.response.data.message !== null && err.response.data.message !== "" ? err.response.data.message : errorMsg.MSG_BAD_REQUEST) }
    return { "code": errCode, "msg": errMessage };
};