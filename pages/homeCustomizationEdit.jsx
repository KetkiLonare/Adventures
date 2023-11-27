import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import CategoryTitleBox from "@/components/CategoryTitleBox/CategoryTitleBox";
import React, { useEffect, useState } from "react";
import CustomPage from "./homeCustomize/mainTabs/CustomePage";
import { useRouter } from "next/router";
import sendHttpRequest from "@/src/http/Request";
import ProductSliderCategory from "@/components/ProductSlider/ProductSliderCategory";
import { useAppContext } from "@/src/hooks/UserContext";

const HomeCustomizationEdit = () => {
  const { state, dispatch } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("exterior-tab-pane");
  const [showModal, setShowModal] = useState(false);
  const [getquote, setGetquote] = useState();

  const user = state.userdata;
  const router = useRouter();
  const productid = router.query.id;
  const quoteid = router.query.quoteid;
  const [productdata, setproductdata] = useState();
  const [item, setItem] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [Selectedbrand, setSelectedBrand] = useState();
  const [Selectedcolor, setSelectedColor] = useState();
  const [Default, setDefault] = useState([]);

  const selectbrand = (event) => {
    const { value } = event.target;
    setSelectedBrand(value);
  };

  const selectcolor = (event) => {
    const { value } = event.target;
    setSelectedColor(value);
  };


  const Submit = async (e) => {
      if(Object.values(state?.customSelection)){
        for (let each of Object.values(state?.customSelection)) {
          const data = {
            getquote:quoteid ,
            users: state?.userdata?.id,
            customizeditems: each,
            products:productid
          };
          const resitem = await sendHttpRequest(
            "post",
            `/authroute/user_quote_items`,
            {},
            { ...data }
          );
        }
      }

      if(Object.values(state?.editcustomSelection)){
        for (let each of Object.values(state?.editcustomSelection)) {
          const id = Object.keys(each)[0]
          const vaiantid = Object.values(each)[0]
          const data = {
            customizeditems:vaiantid,
          };
          const resitem = await sendHttpRequest(
            "put",
            `/authroute/user_quote_items/${id}`,
            {},
            { ...data }
          );
        }
      }

      window.location.href = `/myProfile`
  };
  const getProductdata = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/products/${productid}`,
        {
          relations: ["product_assets", "categories"],
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setproductdata(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getquotedata = async () => {
    try {
      const res = await sendHttpRequest("get", `/authroute/getquote/${quoteid}`, {
        relations: [
          `user_quote_items.getquote`,
          `user_quote_items.customizeditems.customizedcategory`,
          `user_quote_items.customizeditems.customizesubcategory`,
          `user_quote_items.customizeditems.customizedbrands`,
          "products",
          "products.product_assets",
          "products.categories",
        ], where: { users: { id: user?.id }, is_deleted: false, isCustomisedItem: true }
      })
      setGetquote(res?.data?.result?.user_quote_items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDefault = async () => {
    try {
      const res = await sendHttpRequest("get", "/CRUD/default_product_item", {
        relations: ["customizeditems", "customizeditems.customizesubcategory"],
        where: { is_deleted: false, products: { id: productid } },
      });
      setDefault(res?.data?.result);
    } catch (error) {
      console.log("error is here", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
        .then(() => {
          const tabs = new window.bootstrap.Tab(
            document.getElementById("myTab")
          );
          tabs.show();
        })
        .catch((error) => console.error("Error loading Bootstrap", error));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(show);

  const handleShow = () => setShow(!show);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/customizedcategory`,
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      if (res.data && res.data.result) {
        setData(res.data.result);
      } else {
        console.error("Invalid response format:", res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBrand = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/customizedbrands`,
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      if (res.data && res.data.result) {
        setBrand(res.data.result);
      } else {
        console.error("Invalid response format:", res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getColor = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/customize_color`,
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      if (res.data && res.data.result) {
        setColor(res.data.result);
      } else {
        console.error("Invalid response format:", res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);


  useEffect(() => {
    if (productid && quoteid) {
      getProductdata();
      getquotedata()
      getColor();
      getBrand();
      getDefault();
    }
  }, [productid, quoteid]);
  return (
    <>
      <div className="bg-color-primary mb-10 pt-10">
        <div className="container customizeContainer">
          <BreadcrumbNav page={"Home Customization Edit"} />
          <CategoryTitleBox
            name={productdata?.name}
            brochure={productdata?.brochure}
            category_name={productdata?.categories?.name}
            square_feet={productdata?.square_feet}
            no_of_bedrooms={productdata?.no_of_bedrooms}
            no_of_bathrooms={productdata?.no_of_bathrooms}
            id={productdata?.id}
          />
          <h4 className="FW-medium mb-4">Select customizable options</h4>
          <div className="boxShadowPrimary borderRadius-10 bg-white mainTabDiv">
            <ul
              className="nav nav-tabs main-nav-tabs nav-fill"
              id="myTab"
              role="tablist"
            >
              {!!data?.length &&
                data?.map((each, idx) => {
                  let icon = "";
                  switch (each.name.trim()) {
                    case "Exterior":
                      icon = "icon-exterior";
                      break;
                    case "Interior":
                      icon = "icon-interior";
                      break;
                    case "Flooring":
                      icon = "icon-flooring";
                      break;
                    case "Kitchen":
                      icon = "icon-kitchen";
                      break;
                    case "Lighting":
                      icon = "icon-lighting";
                      break;
                    case "Bathroom":
                      icon = "icon-bathroom";
                      break;
                    case "Fireplace":
                      icon = "icon-fireplace";
                      break;
                    default:
                      break;
                  }

                  return (
                    <li className="nav-item" role="presentation" key={idx}>
                      <button
                        className={`nav-link flex flex-col p-3 rounded-lg FS-16 FW-semibold ${idx === 0 && "active"
                          }`}
                        id={`${each.name}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${each.name}-tab-pane`}
                        type="button"
                        role="tab"
                        aria-controls={`${each.name}-tab-pane`}
                        aria-selected={`${idx === 0 ? "true" : "false"}`}
                      >
                        <i className={`${icon} mb-1 FS-24`}></i>
                        {each.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="flex justify-between items-cente my-3 optionFilterDiv">
            <p className="m-0 FW-bold">Options</p>
            {/* <span>
              More Filters <i className="icon-filter"></i>
            </span> */}

            <div className="d-flex">
              <select
                onChange={selectbrand}
                class="form-select-sm me-3 shadow-none px-2"
                id="autoSizingSelect"
              >
                <option value="">Select a Brand</option>
                {brand?.length &&
                  brand.map((item, oidx) => (
                    <option key={oidx} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <select
                onChange={selectcolor}
                class="form-select-sm ms-3 shadow-none px-2"
                id="autoSizingSelect"
              >
                <option value="">Select a Color</option>
                {color?.length &&
                  color.map((item, oidx) => (
                    <option key={oidx} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="tab-content boxShadowPrimary" id="myTabContent">
            {!!data?.length &&
              data?.map((each, idx) => (
                <div
                  className={`tab-pane fade ${idx == 0 && "show active"}`}
                  id={`${each?.name}-tab-pane`}
                  role="tabpanel"
                  aria-labelledby={`${each?.name}-tab`}
                  tabindex="0"
                  key={idx}
                >
                  <CustomPage
                    selection={each?.id}
                    brand={Selectedbrand}
                    color={Selectedcolor}
                    productid={productid}
                    Default={Default}
                    selectedVariant={getquote}
                  />
                </div>
              ))}
          </div>

          <div className="FS-16 FW-semibold flex justify-end items-center py-4 sendOrderDiv">
            <p className="mr-2 mb-0">
              You have total{" "}
              {!!Object.keys(state?.customSelection)?.length || !!Object.keys(state?.editcustomSelection)?.length
                ? (Object.keys(state?.customSelection)?.length + Object.keys(state?.editcustomSelection)?.length)
                : 0}{" "}
              customize items
            </p>
            <button
              className="py-2 px-3 ml-2 borderRadius-5"
              onClick={(event) => Submit()}
            >
              Update Your Order Details
            </button>
       
           
          </div>

          <div className="container my-10 productSliderSection">
            <div>
              <h3 className="FW-extrabold">Similar Home Designs</h3>
              <p className="FW-medium">
                Explore more home designs similar to your search options
              </p>
              <ProductSliderCategory catid={productdata?.categories?.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCustomizationEdit;
