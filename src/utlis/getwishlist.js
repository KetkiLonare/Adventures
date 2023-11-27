// import sendHttpRequest from "@/src/http/Request";

import axios from "axios"
import { NEXT_PUBLIC_APP_API_URL } from "./envConfig"

const getwishlistdata = async (id) => {
  const res = await axios.get(`${NEXT_PUBLIC_APP_API_URL}/CRUD/wishlists/`,{params:{relations:["products"],where:{users:{id:id}, is_deleted: false }}} )
  
  // const res = await sen  dHttpRequest("get","/authroute/wishlists", { relations: ["products"], where: { users: { id: id }, is_deleted: false } },{})

  if (res?.data?.result?.length) {
    const data = res?.data?.result?.map((each, id) => (each?.products?.id))
    return data
  }
  return []
}

export default getwishlistdata



