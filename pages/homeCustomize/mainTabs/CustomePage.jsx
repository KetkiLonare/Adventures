import React, { useEffect, useState } from 'react'
import Subcatgory from '../Subcatgory';
import sendHttpRequest from '@/src/http/Request';

const CustomPage = ({selection,brand,color,productid,Default,selectedVariant}) => {

  const [customize, setCustomize] = useState([])


  const getData = async () => {
    const res = await sendHttpRequest("get",`/CRUD/customizesubcategory`,{where:{ is_deleted:false,customizedcategory:{id:selection},is_active:true}},{},true )
    setCustomize(res.data.result)
  }

 
  useEffect(() => {
    selection && getData()
  }, [selection])
  
 

  return (
    <>
      <div class="d-flex align-items-start subTabDiv">
        <div class="nav flex-column whitespace-nowrap" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          { !!customize?.length && customize?.map((each, idx) => (
              <button key={idx} className={`nav-link text-left FS-14 FW-semibold py-2.5 capitalize ${idx == 0 && "active"}`} id={`v-pills-${each.name.replace(/ /g, "")}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${each.name.replace(/ /g, "")}`} type="button" role="tab" aria-controls={`v-pills-${each.name.replace(/ /g, "")}`} aria-selected={`${idx == 0 && true}`}>
                {each.name}
              </button>
            ))
          }
        </div>
        <div class="tab-content shingleTabContent w-100" id="v-pills-tabContent">
          {!!customize?.length && customize?.map((each, idx) => (
              <div key={idx} className={`tab-pane fade ${idx == 0 && "show active"}`} id={`v-pills-${each?.name.replace(/ /g, "")}`} role="tabpanel" aria-labelledby={`v-pills-${each?.name.replace(/ /g, "")}-tab`} tabindex="0">
                <Subcatgory selection={each.id} selectedbrand={brand} selectedcolor={color} productid={productid} Default={Default} selectedVariant={selectedVariant}/>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default CustomPage