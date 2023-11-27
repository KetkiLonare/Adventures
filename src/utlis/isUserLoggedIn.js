// import { capEachWord } from "./caseConsistent";
// import { USER_LOCALSTORAGE_KEYNAME } from './envConfig';
// import { toast } from 'react-toastify';

// export const isUserLoggedIn = (checkUser, askedForLogin = true) => {
//     const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEYNAME));

//     if (user?.userType == checkUser) { return true };

//     if ((!user && askedForLogin) || (user && user?.userType == "admin")) {
//         return document.querySelector(`#${checkUser}LoginId`).click();
//     }

//     (user && user?.userType != checkUser && askedForLogin) && toast.error(`Please... Login as ${capEachWord(checkUser)} First!`);

//     return false
// }