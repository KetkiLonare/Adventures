import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { initialState, reducer } from "./useReducer";
import { NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY } from "@/src/utlis/envConfig";
import getwishlistdata from "@/src/utlis/getwishlist";

const AppContext = createContext();
 function AppWrapper({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    let sessionStorageData = null;
    const setuserdata = async () => {
        if (sessionStorage.getItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`) != null) {
            sessionStorageData = JSON.parse(
                sessionStorage.getItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`)
            );
            dispatch({ type: "setuserdata", payload: sessionStorageData?.user })
            dispatch({ type: 'logout', payload: false })

            const wishlistdata = await getwishlistdata(sessionStorageData?.user?.id)
            dispatch({ type: "GetWishlist", payload: wishlistdata })

        }
    }


    useEffect(() => {
        setuserdata()
    }, [])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export {AppWrapper};
export default AppWrapper;
export  function useAppContext() {
    return useContext(AppContext);
};