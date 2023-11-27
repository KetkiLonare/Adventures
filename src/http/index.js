import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { REACT_APP_CLIENT_AUTH_STORAGE_KEY, REACT_APP_CLIENT_DEFAULT_AUTH_STORAGE_KEY, REACT_APP_CLIENT_SESSION_STORAGE_KEY, REACT_APP_HEADER_MASTER_STORAGE_KEY, REACT_APP_FILTER_STORAGE_KEY, REACT_APP_DASHBOARD_KPI_STORAGE_KEY, REACT_APP_WORKING_RETURN_KPI_STORAGE_KEY, REACT_APP_ALLOCATION_KPI_STORAGE_KEY, REACT_APP_OVERVIEW_KPI_STORAGE_KEY } from "../utils/envConfig";
import { AuthApi, GuestApi } from "@/src/utlis/api";

const getReq = async ({
  url,
  data = {},
  returnDataKey = null,
  isGuestApi = false,
  errorCallback = () => {},
}) => {
  if (!navigator.onLine) return null;
  try {
    let res;
    if (isGuestApi) {
      res = await GuestApi.get(url, {
        params: data,
      });
    }
    if (!isGuestApi) {
      res = await AuthApi.get(url, {
        params: data,
      });
    }
    if (returnDataKey) {
      return res?.data?.[returnDataKey];
    }
    if (res.status === 200 || res.status === 201) {
      return res.status;
    }
  } catch (e) {
    const { response } = e;

    if (
      response &&
      response.status === 400 &&
      response?.data?.errors &&
      response?.data?.errors.length
    ) {
      const errorObj = response?.data?.errors.reduce((acc, cur) => {
        cur?.field && (acc[cur?.field] = cur?.message);
        if (!cur?.field) {
          toast.error(cur?.message);
        }
        return acc;
      }, {});

      if (Object.keys(errorObj).length) return errorCallback(errorObj);
      return null;
    }
    if (response && response.status === 500) {
      return { statusCode: response.status, ...response.data };
    }
    if (response && response.status === 401) {
    }
    return false;
  }
};

const postReq = async ({
  url,
  data = {},
  returnDataKey = null,
  isGuestApi = false,
  errorCallback = () => null,
  headers = {},
  toastState = true,
  loader = () => null,
  setCallback = null,
}) => {
  if (!navigator.onLine) return null;
  loader(true);
  try {
    let res;
    if (isGuestApi) res = await GuestApi.post(url, data, { headers });
    if (!isGuestApi) res = await AuthApi.post(url, data, { headers });
    const returnData = res?.data?.[returnDataKey];
    if (returnDataKey || returnData) {
      loader(false);
      // toastState && toast.success(res?.data?.success_msg); // success msg from db
      return returnData;
    }
    if (res.status === 200 || res.status === 201) {
      // toastState && toast.success(res?.data?.message);
      loader(false);
      return res.status;
    }
  } catch (e) {
    loader(false);
    const { response } = e;
    if (response.status === 400) {
      return response;
    }
  }
};

const putReq = async (url, values, dataKey = null) => {
  try {
    const res = await AuthApi.put(url, values);
    if (dataKey) {
      toast.success(res?.data?.message);
      return res?.data?.[dataKey];
    }
    if (res.status === 200 || res.status === 201) {
      toast.success(res?.data?.message);
      return res.status;
    }
  } catch (e) {
    const { response } = e;
    response.status === 500
      ? toast.info(response.data.message)
      : console.log(e);
    // if (response.status === 401) {
    //     // sessionStorage.removeItem(USER_LOCALSTORAGE_KEYNAME);
    //     location.replace(`${window.location.origin}`);
    // }
    return response.status;
  }
};

const deleteReq = async ({
  url,
  where = {},
  returnDataKey = null,
  isGuestApi = false,
  errorCallback = () => {},
}) => {
  try {
    let res;
    if (isGuestApi) {
      res = await GuestApi.delete(url, { params: where });
    }
    if (!isGuestApi) {
      res = await AuthApi.delete(url, { params: where });
    }
    if (returnDataKey) {
      return res?.data?.[returnDataKey];
    }
    if (res.status === 200 || res.status === 201) {
      return res.status;
    }
  } catch (e) {
    const { response } = e;

    if (
      response &&
      response.status === 400 &&
      response?.data?.errors &&
      response?.data?.errors.length
    ) {
      const errorObj = response?.data?.errors.reduce((acc, cur) => {
        cur?.field && (acc[cur?.field] = cur?.message);
        if (!cur?.field) {
          toast.error(cur?.message);
        }
        return acc;
      }, {});

      if (Object.keys(errorObj).length) return errorCallback(errorObj);
      return null;
    }
    if (response && response.status === 500) {
      return { statusCode: response.status, ...response.data };
    }
    if (response && response.status === 401) {
    }
    return false;
  }
};

export { getReq, postReq, putReq, deleteReq };
