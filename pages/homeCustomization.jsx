import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import CategoryTitleBox from "@/components/CategoryTitleBox/CategoryTitleBox";
import React, {  useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SendOrderDetails from "@/components/SendOrderDetails/sendOrderDetails";
import CustomPage from "./homeCustomize/mainTabs/CustomePage";
import { useRouter } from "next/router";
import sendHttpRequest from "@/src/http/Request";
import ProductSliderCategory from "@/components/ProductSlider/ProductSliderCategory";
import { useAppContext } from "@/src/hooks/UserContext";

const HomeCustomization = () => {
  const { state, dispatch } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("exterior-tab-pane");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const productid = router.query.id;

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
      dispatch({ type: "clearCustomeSelection" });
      dispatch({ type: "clearEditCustomeSelection" });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);


  useEffect(() => {
    if (productid) {
      getProductdata();
      getColor();
      getBrand();
      getDefault();
    }
  }, [productid]);

  return (
    <>
      <div className="bg-color-primary mb-10 pt-10">
        <div className="container customizeContainer">
          <BreadcrumbNav page={"Home Customization"} />
          <CategoryTitleBox
            name={productdata?.name}
            brochure={productdata?.brochure}
            category_name={productdata?.categories?.name}
            square_feet={productdata?.square_feet}
            no_of_bedrooms={productdata?.no_of_bedrooms}
            no_of_bathrooms={productdata?.no_of_bathrooms}
            style_name={productdata?.name}
            ameneties={productdata?.ameneties}
            kitchen={productdata?.kitchen}
            dimensions={productdata?.dimensions}
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
                        className={`nav-link flex flex-col p-3 rounded-lg FS-16 FW-semibold ${
                          idx === 0 && "active"
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
                  />
                </div>
              ))}
          </div>

          <div className="FS-16 FW-semibold flex justify-end items-center py-4 sendOrderDiv">
            <p className="mr-2 mb-0">
              You have total{" "}
              {!!Object.values(state?.customSelection)?.length
                ? Object.values(state?.customSelection)?.length
                : 0}{" "}
              customize items
            </p>
            <button
              className="py-2 px-3 ml-2 borderRadius-5"
              // onClick={handleShow}
              onClick={(event) =>
                state.logout === true
                  ? dispatch({ type: "togglelogin", payload: true })
                  : handleShow()
              }
            >
              Send Your Order Details
            </button>
            <Modal
              show={show}
              onHide={handleShow}
              dialogClassName="modal-70w"
              size="lg"
            >
              {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title> ss
              </Modal.Header> */}
              <Modal.Body>
                <SendOrderDetails
                  id={productid}
                  closemodel={handleShow}
                  show={show}                  
                />
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
            {/* <Modal
              show={showModal}
              onHide={() => {
                setShowModal(false);
              }}
              // size="sm"
            >
              <Modal.Header closeButton className="border-0 pt-3 pb-0" ></Modal.Header>
              <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="submitedSuccessfully">
                  <img src="/images/success.png" alt="" />
                </div>
                <p>Thank you for contacting Apex Modular Solutions. The Apex team will reach out to you within 48 hours.</p>
              </Modal.Body>
            </Modal> */}
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

export default HomeCustomization;
