import { useAppContext } from "../hooks/UserContext";
import { deleteReq, postReq } from "../http";
import { NEXT_PUBLIC_APP_API_URL } from "./envConfig";

const { default: axios } = require("axios")



export const liked =async (payload)=>{
    console.log("liked")
    const res = await postReq({
        url: `${NEXT_PUBLIC_APP_API_URL}/CRUD/wishlists`,
        data: payload,
        isGuestApi: true,
        returnDataKey: "message",
    });
}

export const disliked =async (id,productid)=>{
    console.log("disliked");
    const res = await deleteReq({
        url: `${NEXT_PUBLIC_APP_API_URL}/CRUD/wishlists`,
        isGuestApi: true,
        where:{where:{users:id,products:productid}},
        returnDataKey: "message",
    });
}

