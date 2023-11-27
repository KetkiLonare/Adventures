import axios from "axios";
import { NEXT_PUBLIC_APP_API_URL, NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY } from "@/src/utlis/envConfig";


async function sendHttpRequest(method = "get", url = "", params = {}, data = {}, isGuestApi = false) {
  try {
    let tokendata = sessionStorage.getItem(
      `${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`
    );
    let token = JSON.parse(tokendata)?.accessToken;
    const headers = {
      authorization: token
    }
    const response = await axios({
      method: method,
      url: `${NEXT_PUBLIC_APP_API_URL}${url}`,
      params: params,
      headers: isGuestApi ? {} : headers,
      data: data
    });

    return response

  } catch (error) {

    if (error?.response?.status === 400 && error?.response?.data?.error == "JWT Token Error") {
      sessionStorage.removeItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`);
      window.location.href = '/' 
    }
    // else{
    //   console.log(error);
    //   toast.error(`${error?.message == "Network Error" ? error?.message : error?.response?.data?.message}`);
    // }
    return error

  }
}

export default sendHttpRequest