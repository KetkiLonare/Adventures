import axios from "axios";
import { toast } from "react-toastify";
import { NEXT_APP_API_URL, NEXT_APP_CLIENT_AUTH_STORAGE_KEY, NEXT_APP_CLIENT_SESSION_STORAGE_KEY, NEXT_APP_FILTER_STORAGE_KEY } from "./envConfig";
// import { payloadDecrypter, payloadEncrypter } from "./fileEncrypter";

export const checkDataIsValid = (data) => {
    if (data !== null && data !== undefined && data !== "") {
        return true;
    }
    return false;
};

const tokenExpiredError = "Not Authorized";

let token = null;
// let data  = sessionStorage.getItem(`${NEXT_APP_CLIENT_SESSION_STORAGE_KEY}`);
// token = JSON.parse(data);

// let authData  = sessionStorage.getItem(`${NEXT_APP_CLIENT_AUTH_STORAGE_KEY}`);
// authData = JSON.parse(authData);



const GuestApi = axios.create({
    baseURL: NEXT_APP_API_URL,
});

const AuthApi = axios.create({
    baseURL: NEXT_APP_API_URL + "/",
});


const setToken = (accesstoken) => {
    const data = sessionStorage.getItem(
        `${ACCESS_TOKEN_KEY}`
    );
    const tokendata = JSON.parse(data);
    tokendata.accessToken = accesstoken;
    sessionStorage.setItem(
        `${ACCESS_TOKEN_KEY}`,
        `${JSON.stringify(tokendata)}`
    );
};

// const setUserData = async (updateObj ) => {
//     if (authData) {
//         authData = {
//             ...authData,
//             ...updateObj
//         }
//         sessionStorage.setItem(`${NEXT_APP_CLIENT_AUTH_STORAGE_KEY}`, `${JSON.stringify(authData)}`);
//     }
// };


AuthApi.interceptors.request.use(
    async (config) => {
        // config?.data && (config.data = await payloadEncrypter(JSON.stringify(config.data)))
        if (token && token !== undefined) {
            config.headers["Authorization"] = `${token?.accessToken}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

AuthApi.interceptors.response.use(
    async (response) => {
        // response.data = await payloadDecrypter(response?.data)
        return response;
    },
    async function (error) {
        let originalRequest = error.config;
        const { response: errRes } = error;
        const { status, data } = errRes;
        if (
            errRes &&
            status === 401 &&
            checkDataIsValid(data) &&
            Object.keys(data).length &&
            checkDataIsValid(data.errors)
        ) {
            const errors = data.errors;
            if (errors.length > 0) {
                const name = errors[0].message;

                if (name === tokenExpiredError && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const sendData = {
                        refreshToken_id: token.refreshToken_id,
                        refresh_token: token.refreshToken,
                    };
                    return GuestApi.post("/token", { ...sendData })
                        .then((res) => {
                            const { status: ref_status, data: ref_data } = res;
                            if (ref_status === 201 && ref_data.status === "SUCCESS") {
                                const { accessToken } = ref_data;
                                originalRequest.headers["Authorization"] = `${accessToken}`;
                                setToken(accessToken);
                                window.location.reload();
                                return axios(originalRequest);
                            }
                        })
                        .catch((e) => {
                            const { response } = e;
                            if (response.status === 403) {
                                sessionStorage.removeItem("client_data");
                                window.location.reload();
                            }
                        });
                }
            }
            // toast.warning(`Session expired....Please Login to continue!`);
            return Promise.reject(error);
        }
        // toast.warning(`Session expired....Please Login to continue!`);
        return Promise.reject(error);
    }
);

export { GuestApi, AuthApi };
