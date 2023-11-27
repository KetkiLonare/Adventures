import { useAppContext } from '@/src/hooks/UserContext';
import sendHttpRequest from '@/src/http/Request';
import React, { useEffect, useState } from 'react'

const EnquiryForm = () => {
    const { state, dispatch } = useAppContext();
  const user = state.userdata;

    const[enquiryData,setEnquiryData]=useState();

    
    const getEnquiryData = async () => {
        try {
    
          const res = await sendHttpRequest("get",`/authroute/getquote`, {
                relations: [
                  "products",
                  "products.product_assets",
                  "products.categories",
                ],
                where: { is_deleted: false },
              },)
              setEnquiryData(res?.data?.result);
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(()=> (
        getEnquiryData()

      ),[user])

  return (
    <div>
      EnquiryFormEnquiryFormEnquiryFormEnquiryForm
    </div>
  )
}

export default EnquiryForm
