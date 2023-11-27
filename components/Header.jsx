import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Login from "@/components/auth/Login";
import SignUp from "./auth/SignUp";
import { useAppContext } from "@/src/hooks/UserContext";
import Link from "next/link";
import sendHttpRequest from "../src/http/Request";
import { Image, Offcanvas, Dropdown, Card, Form, Row, Col, Accordion, Table, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import useForm from "@/src/hooks/useForm";
import { validateCommercials } from "@/src/validate/validateCommercials";
import { cleanDistDir } from "@/next.config";
import { CgLogIn } from "react-icons/cg";
import { BsSend } from "react-icons/bs";
import AdminPng from "../public/images/admin_img.png";
// import AdminPng from "@/public/images/admin_img.png";

import Forgetpassword from "@/pages/ForgetPassword";

const homeCategoory = [{ link: `Modular`, name: "Modular" }, { link: `Manufactured Homes`, name: 'Manufactured Homes' }, { link: `Tiny Homes`, name: "Tiny Homes", cat: true }, { link: `Cape Cod`, name: "Cape Cod" }, { link: `Colonial`, name: "Colonial" }, { link: `Ranch`, name: "Ranch" }, { link: `Ranch Cape`, name: "Ranch Cape" }, { link: `Raised Ranch`, name: "Raised Ranch" }, { link: `Single`, name: "Single" }, { link: `Two Level`, name: "Two Level" }, { link: ``, name: "All Homes" }];

const multiUnit = [{ link: `/contentpage?name=Duplex`, name: "Duplex" }, { link: `/contentpage?name=Townhouses`, name: "Townhouses" }, { link: `/contentpage?name=Multiplexes`, name: "Multiplexes" }, { link: `/contentpage?name=Apartment Buildings`, name: "Apartment Buildings" }]


const serviceArray = [{ link: `/financing`, name: " Financing" }, { link: `/Compositetoilets`, name: "Composite Toilets Options" }, { link: `/LandSaleExperts`, name: "Land Sale Experts" }, { link: `preferredContractors`, name: " Preferred Contractors" }];



const Header = () => {
    const { state, dispatch } = useAppContext();

    const [data, setData] = useState({});
    const [manData, setManData] = useState({});
    const [theme, setTheme] = useState();
    const [messageData, setMessageData] = useState({});
    const [isShown, setIsShown] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [formObj, setFormObj] = useState({
        budget: "",
        first_name: "",
        last_name: "",
        title: "",
        prjct_loc_street: "",
        prjct_loc_city: "",
        prjct_loc_country: "",
        company_street: "",
        company_city: "",
        company_state: "",
        company_zip: "",
        builder_plan: "",
        site_plan: "",
        property_surveys: "",
        elevation_drawings: "",
        soil_test_report: "",
        utility_map: "",
        architectural_plans: "",
        engineering_report: "",
        permitting_doc: "",
        start_time: "",
        project_type: "",
        specific_budget: "",
        construction_type: "",
        digit_stuct_designation: "",
        project_approval: "",
        projct_total_amt: "",
        descriptions: "",
        email: "",
        contact_no: ""

    });

    const homeOptions = [{ link: `/searchListing`, name: "  Home Customization" }, { link: `/solarOptionPage`, name: "Solar Options" }, { link: `/MaterialFinishes`, name: " Materials & Finishes" }]

    const [isAccordionEnabled, setIsAccordionEnabled] = useState(false);
    const [isTotalAmountEnabled, setIsTotalAmountEnabled] = useState(false);
    const [isBudget, setIsBudget] = useState(false);
    const [msg, setMsg] = useState();

    const [showSimpleForm, setShowSimpleForm] = useState(false);
    const [receiverMsg, setReceiverMsg] = useState([])


    const toggleSimpleForm = () => {
        setShowSimpleForm(!showSimpleForm);
    };


    const [valuesMsg, setValuesMsg] = useState('');
    const [quotationMsg, setQuotationMsg] = useState({});




    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const [showCommercialModal, setShowCommercialModal] = useState(false);

    const handleShowCommercialModal = () => {
        setShowCommercialModal(true);
    };


    const handleCloseCommercialModal = () => {
        setErrors({});
        setShowCommercialModal(false);
        setIsSubmitting(false);
        resetForm();

    };

    // for hamburger menus
    const [showSidebar, setShowSidebar] = useState(false);
    const handleSidebarClose = () => setShowSidebar(false);
    const handleSidebarShow = () => setShowSidebar(true);

    const modalRef = useRef();


    const resetForm = () => {
        setValues({ ...formObj }); // Reset form values to their initial state (formObj)
    };


    const Submit = async () => {
        const res = await sendHttpRequest(
            "post",
            `/sub/commercials_post`,
            {}, values
        );
        resetForm();
        dispatch({ type: "formSubmission", payload: true });

        if (res.status === 201) {
            handleCloseCommercialModal()
            setMsg('Form Submitted Successfully');
        }

    };


    const httpPostMessage = async () => {
        try {

            const res = await sendHttpRequest(
                "post",
                `/CRUD/message/${state?.userdata?.id}`,
                {},
                {
                    message: valuesMsg, users: state?.userdata?.id
                    , sender_id: JSON.parse(sessionStorage.getItem('userdata') ?? {})?.user.id,
                    type: state?.userdata?.user_type,
                    getquote: { id: quotationMsg[204]?.getquote?.id }
                }
            );
            getMessage();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        httpPostMessage()
    }, [])



    const getProduct = async () => {
        const res = await sendHttpRequest(
            "get",
            `/CRUD/products`,
            { where: { is_deleted: false } }, {});

        setData(res?.data?.result)

    }

    const getQuoteItems = async () => {
        const res = await sendHttpRequest(
            "get",
            `/CRUD/user_quote_items`,
            { relations: ["getquote"], where: { is_deleted: false } }, {});
        setQuotationMsg(res?.data?.result)
    }

    const getManufactured = async () => {
        const res = await sendHttpRequest(
            "get",
            `/CRUD/products`,
            { where: { is_manufactured: true } }, {});

        setManData(res?.data?.result)
    }


    const handelLogout = async () => {
        sessionStorage.removeItem("userdata");
        dispatch({ type: "setuserdata", payload: null });
        dispatch({ type: "logout", payload: true });

        window.location.replace("/");
    };

    useEffect(() => {
        function handler(event) {
            if (!modalRef.current?.contains(event.target)) {
                setIsShown(false);
            }
        }
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const getData = async () => {
        try {
            const res = await sendHttpRequest(
                "get",
                "/CRUD/themes_settings",
                { where: { is_deleted: false } },
                {},
                true
            );
            setTheme(res?.data?.result);
        } catch (error) {
            console.log("error is here", error);
        }
    };

    const getMessage = async () => {
        try {
            const res = await sendHttpRequest(
                "get",
                `/CRUD/message`,
                { where: { users: { id: JSON.parse(sessionStorage.getItem('userdata') ?? {})?.user.id, getquote: { id: quotationMsg[204]?.getquote?.id } }, is_deleted: false, } }, {}, true
            );
            setReceiverMsg(res?.data?.result)

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getData();
        getProduct();
        getManufactured();
        getMessage();
        getQuoteItems();
    }, []);

    const [lgShow, setLgShow] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        // Handle other form field changes
        if (name === 'builder_plan') {
            setIsAccordionEnabled(value === 'Yes');
        }

        if (name === 'project_approval') {
            setIsTotalAmountEnabled(value === 'Yes');
        }

        if (name === 'budget') {
            setIsBudget(value === 'Specific Budget Amount');
        }
    };


    const {
        values,
        handleSubmit,
        // handleChange,
        setErrors,
        setIsSubmitting,
        errors,
        setValues,
    } = useForm(Submit, validateCommercials, { ...formObj });


    const handleChangeMessage = (event) => {
        const { name, value } = event.target;
        setValuesMsg(value);
    };

    const handleSubmitMessage = async () => {
        await httpPostMessage();
        setValuesMsg('');
    }
    // const handleSubmitAndCloseModal = () => {
    //   handleSubmit(); // Handle your form submission here
    //   handleCloseCommercialModal(); // Close the modal
    // }

    return (
        <>
            <div className="w-full relative">
                <div className="headerTop d-none d-lg-block">
                    <div className="container">
                        <div className="row justify-content-between py-2">
                            <div className="col-auto leftContent flex items-center">
                                {/* <span>
                                    <span className="FW-semibold">Special Offers</span>
                                    <span className="FW-regular">
                                        {" "}
                                        : Read about our{" "}
                                        <Link href="#" className="underline">
                                            Special Offers
                                        </Link>
                                        .{" "}
                                    </span>{" "}
                                </span> */}
                            </div>
                            <div className="col-auto rightContent flex justify-content-end items-center">
                                {theme?.length ? (
                                    theme?.map((each, idx) => (
                                        <>
                                            {/* <span className="FW-medium flex items-center" key={idx}>
                      <i className="icon-envelope mr-2 FS-18"></i>{" "}
                      {each?.email ? each?.email : "info@apexmodulars.com"}
                    </span> */}

                                            <Link
                                                href={`mailto:${each?.email ? each?.email : "info@apexmodulars.com"
                                                    }`}
                                                className="FW-medium flex items-center"
                                                key={idx}
                                            >
                                                <i className="icon-envelope mr-2 FS-18"></i>{" "}
                                                {each?.email ? each?.email : "info@apexmodulars.com"}
                                            </Link>
                                            <Link
                                                href={`tel:${each?.mobile_no
                                                    ? each?.mobile_no.replace(/\s/g, "")
                                                    : "845-393-1477 - 866-APEX-777"
                                                    }`}
                                                className="FW-medium flex items-center mx-8"
                                            >
                                                <i className="icon-phone mr-2 FS-18"></i>
                                                {each?.mobile_no
                                                    ? each?.mobile_no
                                                    : "845-393-1477 - 866-APEX-777"}
                                            </Link>
                                        </>
                                    ))
                                ) : (
                                    <>
                                        <span className="FW-medium flex items-center">
                                            <i className="icon-envelope mr-2 FS-18"></i>{" "}
                                            info@apexmodulars.com
                                        </span>
                                        <span className="FW-medium flex items-center mx-8">
                                            <i className="icon-phone mr-2 FS-18"></i>845-393-1477 -
                                            866-APEX-777
                                        </span>
                                    </>
                                )}

                                {/* {state?.userdata?.name && state?.logout == false ? (
                                    <div className="m-0 login-profile">
                                        <Dropdown className="notification">
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                className="border-0 p-0 bg-transparent"
                                            >
                                                <span className="icon-notificationBell position-relative me-4">
                                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                                                </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="client-notification p-3 border-0 boxShadowPrimary">
                                                <div className="d-flex FS-14">
                                                    <Image src="/images/profile.png" alt="" />
                                                    <div>
                                                        <div>

                                                            Gaurav Sharma responded to Shingles you requested.
                                                        </div>
                                                        <button
                                                            className="border my-2"
                                                            onClick={() => setLgShow(true)}
                                                        >

                                                            Check Response
                                                        </button>
                                                        <div className="currentTime">Today at 9:42 AM</div>
                                                    </div>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown className="profile">
                                            <Dropdown.Toggle
                                                id="dropdown-basic"
                                                className="border-0 p-0 bg-transparent"
                                            >
                                                <span>Welcome</span>{" "}
                                                <span className="FW-bold capitalize">
                                                    {state?.userdata.name}
                                                </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className=" boxShadowPrimary p-3">
                                                <Dropdown.Item
                                                    href="/myProfile"
                                                    className="p-0 py-1 FS-14"
                                                >
                                                    {" "}
                                                    <span className="icon-profile"></span> Profile
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item
                                                    href="#/action-2"
                                                    className="p-0 py-1 FS-14"
                                                    onClick={() => handelLogout()}
                                                >
                                                    {
                                                        // <button onClick={()=> handelLogout()} className="ms-3">
                                                        <i className="icon-switch"></i>
                                                        // </button>
                                                    }{" "}
                                                    Log Out
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <span className="d-flex align-items-center">
                                        <Button
                                            variant="none"
                                            onClick={() =>
                                                dispatch({ type: "togglelogin", payload: true })
                                            }
                                            className="p-0 text-white border-none FS-14"
                                        >
                                            {" "}
                                            Log In
                                        </Button>{" "}
                                        <span className="FW-semibold FS-20 mx-2">|</span>{" "}
                                        <Button
                                            variant="none"
                                            onClick={() =>
                                                dispatch({ type: "togglesignup", payload: true })
                                            }
                                            className="p-0 text-white border-none FS-14"
                                        >
                                            Sign Up
                                        </Button>
                                    </span>
                                )} */}

                                <Modal
                                    show={state?.logintoggle}
                                    onHide={() =>
                                        dispatch({ type: "togglelogin", payload: false })
                                    }
                                    centered
                                >
                                    <Login dispatch={dispatch} />
                                </Modal>
                                <Modal
                                    show={state?.forgettoggle}
                                    onHide={() =>
                                        dispatch({ type: "forgettoggle", payload: false })
                                    }
                                    centered
                                >
                                    <Forgetpassword />
                                </Modal>
                                {/* <Modal
                                    show={state?.signuptoggle}
                                    onHide={() =>
                                        dispatch({ type: "togglesignup", payload: false })
                                    }
                                    centered
                                >
                                    <SignUp dispatch={dispatch} />
                                </Modal>
                                <Modal
                                    size="lg"
                                    show={lgShow}
                                    onHide={() => setLgShow(false)}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                    className="mainModal"
                                >
                                    <Modal.Header className=" p-1 bg-warning-subtle fw-bolder">
                                        <h6 className="modal-heading">Item not available </h6>
                                    </Modal.Header>
                                    <Modal.Body className="profileModal">
                                        <div className="row">
                                            <div className="col-5">
                                                <Image
                                                    src="/images/home1.png"
                                                    className="borderRadius-5"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="col-7 px-4">
                                                <h3 className="fw-medium">
                                                    The item you added{" "}
                                                    <span className="fw-bolder FS-28">“Shingles”</span>{" "}
                                                    (Some text here)
                                                </h3>
                                                <div>
                                                    <button className="border-0 cst1-primary btn-sm btn btn-primary" onClick={toggleSimpleForm}>Message</button>
                                                    {showSimpleForm && (
                                                        <div className="chat-page card shadow p-3 " style={{ height: "500px", overflow: "scroll" }}>
                                                            <div className="msg-inbox">
                                                                <div className="chats" style={{ overflow: "auto", maxWidth: "100%" }}>
                                                                    <div className="msg-page">
                                                                        {receiverMsg?.map((each, idx) => (
                                                                            <div className="message-container" key={idx}>
                                                                                {each.type === "user" ? (
                                                                                    <div className="received-chats">
                                                                                        <div className="received-chats-img">
                                                                                            <Image src="/images/client_img.jpg" alt="" />
                                                                                        </div>
                                                                                        <div className="received-msg">
                                                                                            <div className="received-msg-inbox">
                                                                                                <p>{each.message}</p>
                                                                                                <span className="time">{each.created_at}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : each.type === "admin" ? (
                                                                                    <div className="outgoing-chats">
                                                                                        <div className="outgoing-chats-img">
                                                                                            <Image src="/images/admin_img.png" alt="" />

                                                                                        </div>
                                                                                        <div className="outgoing-msg">
                                                                                            <div className="outgoing-chats-msg">
                                                                                                <p className="multi-msg">{each.message}</p>
                                                                                                <span className="time">{each.created_at}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                        ))}
                                                                    </div>


                                                                </div>
                                                                <div className="msg-bottom">
                                                                    <InputGroup>
                                                                        <FormControl
                                                                            type="text"
                                                                            name="message"
                                                                            value={valuesMsg}
                                                                            onChange={handleChangeMessage} placeholder="search here...."
                                                                        />
                                                                        <Button className="send-icon" onClick={handleSubmitMessage}>
                                                                            <BsSend />
                                                                        </Button>
                                                                    </InputGroup>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )}

                                                </div>
                                                <Card className="boxShadowQuinary mt-4">
                                                    <Card.Body>
                                                        {messageData?.length && messageData?.map((each, idx) => (
                                                            <div key={idx}>
                                                                <h5>
                                                                    {" "}
                                                                    <span className="icon-good-quality"></span> Gaurav
                                                                    Sharma
                                                                </h5>
                                                                <div className="quote mt-3">
                                                                    {each?.message}
                                                                </div>
                                                                <div className="FS-14"> {each?.created_at}</div>
                                                            </div>
                                                        ))}

                                                    </Card.Body>
                                                </Card>
                                            </div>

                                        </div>
                                        <div className="my-4 border-bottom pb-3">
                                            <h4 className="fw-medium">
                                                Instead this you can choose :
                                            </h4>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3  my-3">
                                                <div className=" position-relative products">
                                                    <img src="/images/Vector.png" alt="" />
                                                    <div className="position-absolute bottom-0 start-0 p-3">
                                                        <div className="customer-name">Burnt Sienna</div>
                                                        <div className="certified">
                                                            {" "}
                                                            Brand : CertainTeed
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="customer-name d-flex justify-content-between">
                                                    <div>Burnt Sienna</div>
                                                    <div>Rs.566576</div>
                                                </div>
                                                <div className="certified"> Brand : CertainTeed</div>
                                            </div>
                                            <div className="col-lg-3 my-3">
                                                <div className="position-relative products">
                                                    <img src="/images/Vector.png" alt="" />
                                                    <div className="position-absolute bottom-0 start-0 p-3">
                                                        <div className="customer-name">Burnt Sienna</div>
                                                        <div className="certified">
                                                            {" "}
                                                            Brand : CertainTeed
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="customer-name d-flex justify-content-between">
                                                    <div>Burnt Sienna</div>
                                                    <div>Rs.566576</div>
                                                </div>
                                                <div className="certified"> Brand : CertainTeed</div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="p-2 px-5 border-0">
                                        <Button variant="secondary" className="p-1">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" className="p-1">
                                            Choose
                                        </Button>
                                    </Modal.Footer>
                                </Modal> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="container">
                        <nav className="navbar justify-between">
                            <Link href="/">
                                {" "}
                                <div className="logoDiv">
                                    <Image src="/images/apexlogo.png" alt="" />
                                </div>
                            </Link>
                            <button className="d-block d-lg-none" onClick={handleSidebarShow}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                            <ul className="nav d-none d-lg-flex items-center FS-16 FW-semibold">
                                {/* <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="#"
                                    >
                                        Tiny Homes <i className="icon-black-dropdown ml-2"></i>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        {data?.length && data.map((each, idx) => {
                                            if (each?.name === "Rurality") {
                                                return (
                                                    <li className="px-3 py-1 my-1" key={idx}>
                                                        <Link
                                                            href={`/requestInformation?id=${each?.id}`}
                                                            className="text-decoration-none text-white block whitespace-nowrap"
                                                        >
                                                            {each?.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            if (each?.name === "Provincial") {
                                                return (
                                                    <li className="px-3 py-1 my-1" key={idx}>
                                                        <Link
                                                            href={`/requestInformation?id=${each?.id}`}
                                                            className="text-decoration-none text-white block whitespace-nowrap"
                                                        >
                                                            {each?.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            if (each?.name === "Suburban") {
                                                return (
                                                    <li className="px-3 py-1 my-1" key={idx}>
                                                        <Link
                                                            href={`/requestInformation?id=${each?.id}`}
                                                            className="text-decoration-none text-white block whitespace-nowrap"
                                                        >
                                                            {each?.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            if (each?.name === "Urbaneer") {
                                                return (
                                                    <li className="px-3 py-1 my-1" key={idx}>
                                                        <Link
                                                            href={`/requestInformation?id=${each?.id}`}
                                                            className="text-decoration-none text-white block whitespace-nowrap"
                                                        >
                                                            {each?.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                            return null; // Return null for items with subcategories other than "Suburban"
                                        })}
                                    </ul>
                                </li> */}
                                {/* <li className="nav-item dropdown"> */}
                                {/* <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="/brand">Brands 
                                    </Link> */}
                                {/* <ul className="dropdown-menu">
                                    <li className="px-3 py-1 my-1" >
                                                <Link
                                                    href={`/contentpage?name= Ranch`}
                                                    className="text-decoration-none text-white block whitespace-nowrap"
                                                >
                                                Brand Name
                                                </Link>
                                            </li>
                                    </ul> */}
                                {/* </li> */}
                                {/* <li className="nav-item dropdown"> */}
                                <Link
                                    className="nav-link flex items-center FW-semibold FS-16"
                                    href="#"
                                >
                                    Homes
                                    {/* <i className="icon-black-dropdown ml-2"></i> */}
                                </Link>
                                {/* <ul className="dropdown-menu">

                                        {homeCategoory.map(({ link, name,cat }, idx) => (
                                            <li className="px-3 py-1 my-1" key={idx}>
                                                <Link
                                                    href={`/contentpage${(link && !cat) ? "?name=" : cat ? "?catg=" : ""}${link}`}
                                                    className="text-decoration-none text-white block whitespace-nowrap"
                                                >
                                                    {name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul> */}
                                {/* </li> */}
                                {/* <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="#"
                                    >
                                        Multi Unit Solutions{" "}
                                        <i className="icon-black-dropdown ml-2"></i>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        {multiUnit?.map((each, idx) => (
                                            <li className="px-3 py-1 my-1" key={idx}>
                                                <Link
                                                    href={each?.link}
                                                    className="text-decoration-none text-white block whitespace-nowrap">
                                                    {each?.name}
                                                </Link>
                                            </li>))}
                                    </ul>
                                </li> */}
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="/#"
                                    // onClick={handleShowCommercialModal}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="#"
                                    >
                                        Products
                                        {/* <i className="icon-black-dropdown ml-2"></i> */}
                                    </Link>
                                    {/* <ul className="dropdown-menu">
                                        {serviceArray?.map((each, idx) => (
                                            <li className="px-3 py-1 my-1" key={idx}>
                                                <Link
                                                    href={each?.link}
                                                    className="text-decoration-none text-white block whitespace-nowrap" >
                                                    {each?.name}
                                                </Link>
                                            </li>))}

                                    </ul> */}
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link flex items-center FW-semibold FS-16"
                                        href="/contactUs"
                                    >
                                        Contact Us
                                        {/* <i className="icon-black-dropdown ml-2"></i> */}
                                    </Link>
                                    {/* <ul className="dropdown-menu">
                                        {homeOptions?.map((each, idx) => (
                                            <li className="px-3 py-1 my-1" key={idx}>
                                                <Link
                                                    href={each?.link}
                                                    className="text-decoration-none text-white block whitespace-nowrap"
                                                >
                                                    {each?.name}
                                                </Link>
                                            </li>
                                        ))}

                                    </ul> */}
                                </li>

                            </ul>

                            {/* </div> */}
                        </nav>
                        <Offcanvas
                            show={showSidebar}
                            onHide={handleSidebarClose}
                            className="hamburgerMenu"
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <div className="logoDiv">
                                        <Image src="/images/apexlogo.png" alt="" />
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Accordion defaultActiveKey="0">
                                    {/* <Accordion.Item eventKey="0">
                                        <Accordion.Header>Tiny Homes</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {data?.length && data.map((each, idx) => {
                                                    if (each?.name === "Rurality") {
                                                        return (
                                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                                <Link
                                                                    href={`/requestInformation?id=${each?.id}`}
                                                                >
                                                                    {each?.name}
                                                                </Link>
                                                            </ListGroup.Item>
                                                        );
                                                    }
                                                    if (each?.name === "Provincial") {
                                                        return (
                                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                                <Link
                                                                    href={`/requestInformation?id=${each?.id}`}
                                                                >
                                                                    {each?.name}
                                                                </Link>
                                                            </ListGroup.Item>
                                                        );
                                                    }
                                                    if (each?.name === "Suburban") {
                                                        return (
                                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                                <Link
                                                                    href={`/requestInformation?id=${each?.id}`}
                                                                >
                                                                    {each?.name}
                                                                </Link>
                                                            </ListGroup.Item>
                                                        );
                                                    }
                                                    if (each?.name === "Urbaneer") {
                                                        return (
                                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                                <Link
                                                                    href={`/requestInformation?id=${each?.id}`}
                                                                >
                                                                    {each?.name}
                                                                </Link>
                                                            </ListGroup.Item>
                                                        );
                                                    }
                                                })}

                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item> */}
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Homes</Accordion.Header>
                                        <Accordion.Body>
                                            {homeCategoory.map(({ link, name }, idx) => (
                                                <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                    <Link
                                                        href={`/contentpage${link ? "?name=" : ""}${link}`}
                                                    >
                                                        {name}
                                                    </Link>
                                                </ListGroup.Item>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Multi Unit Solutions</Accordion.Header>
                                        <Accordion.Body>
                                            {multiUnit?.map((each, idx) => (
                                                <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                    <Link
                                                        href={each?.link}
                                                    >
                                                        {each?.name}
                                                    </Link>
                                                </ListGroup.Item>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3" onClick={handleSidebarClose}>
                                        <Accordion.Header onClick={handleShowCommercialModal}>Commercial</Accordion.Header>
                                        {/* <Accordion.Body>
                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose}>
                                                <Link
                                                    href="#"
                                                    onClick={handleShowCommercialModal}
                                                >
                                                </Link>
                                            </ListGroup.Item>
                                        </Accordion.Body> */}
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Services</Accordion.Header>
                                        <Accordion.Body>
                                            {serviceArray?.map((each, idx) => (
                                                <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                    <Link
                                                        href={each?.link}
                                                    >
                                                        {each?.name}
                                                    </Link>
                                                </ListGroup.Item>))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>Home Options</Accordion.Header>
                                        <Accordion.Body>
                                            {homeOptions?.map((each, idx) => (
                                                <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose} key={idx}>
                                                    <Link
                                                        href={each?.link}
                                                    >
                                                        {each?.name}
                                                    </Link>
                                                </ListGroup.Item>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>About Us</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose}>
                                                <Link
                                                    href="/news"
                                                >
                                                    News
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose}>
                                                <Link
                                                    href="/contentpage?name=Gallery"
                                                >
                                                    Gallery
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="px-0 py-1 border-bottom-0" onClick={handleSidebarClose}>
                                                <Link
                                                    href="/contactUs"
                                                >
                                                    Contact Us
                                                </Link>
                                            </ListGroup.Item>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Modal
                            show={state?.formSubmission}
                            onHide={() => {
                                dispatch({ type: "formSubmission", payload: false });
                            }}
                        // size="sm"
                        >
                            <Modal.Header
                                closeButton
                                className="border-0 pb-0"
                            ></Modal.Header>
                            <Modal.Body className="d-flex flex-column justify-content-center align-items-center pt-0">
                                <div className="submitedSuccessfully mb-3">
                                    <img src="/images/success.png" alt="" />
                                </div>
                                <p>
                                    Thank you for contacting Apex Modular Solutions. The Apex team
                                    will reach out to you within 48 hours.
                                </p>
                            </Modal.Body>
                        </Modal>
                        <Modal show={showCommercialModal} onHide={handleCloseCommercialModal} dialogClassName="modal-70w" className="commercial-form">
                            <Modal.Header closeButton className="border-bottom-0 px-5 py-2">
                                <Modal.Title><h5 className="FW-extrabold">COMMERCIAL CONTACT FORM</h5></Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="px-5">
                                <Form onSubmit={handleSubmit}>
                                    <p className="text-justify">All commercial inquiries must fill out the contact form to begin quoting, bidding, and project review. This process helps us gather essential information about your project, ensuring that our team can provide you with accurate quotes, relevant details, and the most effective support tailored to your specific needs.</p>
                                    <p className="FW-bold mb-2">Contact Details<subset style={{ color: "red" }}>*</subset></p>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} sm="auto" controlId="formGridTitle">
                                            <Form.Select aria-label="Default select example">
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Miss">Miss</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridFirstName">
                                            <Form.Control type="text" placeholder="First Name" name="first_name" value={values?.first_name ?? ""} onChange={handleChange} isInvalid={!!errors?.first_name} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridLastName">
                                            <Form.Control type="text" placeholder="Last Name" name="last_name" value={values?.last_name ?? ""} onChange={handleChange} isInvalid={!!errors?.last_name} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridContact">
                                            <Form.Control type="text" placeholder="Phone" name="contact_no" value={values?.contact_no ?? ""} onChange={handleChange} isInvalid={!!errors?.contact_no} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Control type="email" placeholder="Email" name="email" value={values?.email ?? ""} onChange={handleChange} isInvalid={!!errors?.email} />
                                        </Form.Group>
                                    </Row>
                                    <p className="FW-bold mb-2">Project Location <subset style={{ color: "red" }}>*</subset></p>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} controlId="formGridStreet">
                                            <Form.Control type="text" placeholder="Street" name="prjct_loc_street" value={values?.prjct_loc_street ?? ""} onChange={handleChange} isInvalid={!!errors?.prjct_loc_street} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control type="text" placeholder="City" name="prjct_loc_city" value={values?.prjct_loc_city ?? ""} onChange={handleChange} isInvalid={!!errors?.prjct_loc_city} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control type="text" placeholder="State" name="prjct_loc_state" value={values?.prjct_loc_state ?? ""} onChange={handleChange} isInvalid={!!errors?.prjct_loc_state} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Control type="text" placeholder="Zip" name="prjct_loc_zip" value={values?.prjct_loc_zip ?? ""} onChange={handleChange} isInvalid={!!errors?.prjct_loc_zip} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCountry">
                                            <Form.Control type="text" placeholder="County" name="prjct_loc_country" value={values?.prjct_loc_country ?? ""} onChange={handleChange} isInvalid={!!errors?.prjct_loc_country} />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridCompanyName">
                                            <Form.Label className="FW-bold">Company/Organization Name <subset style={{ color: "red" }}>*</subset></Form.Label>
                                            <Form.Control type="text" placeholder="Company Name" value={values?.company_org_name ?? ""} name="company_org_name" isInvalid={!!errors?.company_org_name} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridWebsite">
                                            <Form.Label className="FW-bold">Website</Form.Label>
                                            <Form.Control type="url" placeholder="Website" />
                                        </Form.Group>
                                        {/* </Row> */}
                                    </Row>
                                    <p className="FW-bold mb-3">Company Address <subset style={{ color: "red" }}>*</subset></p>
                                    <Row className="mb-4">
                                        <Form.Group as={Col} controlId="formGridStreet">
                                            <Form.Control type="text" placeholder="Street" name="company_street" value={values?.company_street ?? ""} onChange={handleChange} isInvalid={!!errors?.company_street} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Control type="text" placeholder="City" name="company_city" value={values?.company_city ?? ""} onChange={handleChange} isInvalid={!!errors?.company_city} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Control type="text" placeholder="State" name="company_state" value={values?.company_state ?? ""} onChange={handleChange} isInvalid={!!errors?.company_state} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Control type="text" placeholder="Zip" name="company_zip" value={values?.company_zip ?? ""} onChange={handleChange} isInvalid={!!errors?.company_zip} />
                                        </Form.Group>

                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridPlans">
                                            <Form.Label column sm="auto" className="FW-bold">
                                                Do You Have Building Plans?
                                            </Form.Label>
                                            <Col sm={3}>
                                                <Form.Select as={Col} defaultValue="Choose" name="builder_plan" value={values?.builder_plan ?? ""} onChange={handleChange}>
                                                    <option value="">Choose</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="Working on Them">Pending</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Accordion className="building-plans-accord my-3" activeKey={isAccordionEnabled ? '0' : null}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header className="FS-12">IF YES</Accordion.Header>
                                                <Accordion.Body>
                                                    <p className="mb-1">Please Attach the Following Documents to Your Inquiry:</p>
                                                    <p className="text-danger FS-12">*Supported file types: PDF, WORD, TXT, JPG, JPEG, PNG, CAD, and PPT.</p>
                                                    <Row className="mb-3">
                                                        {[{ heading: "Site Plans", data: "Provide an overview of the property layout", name: "site_plan" }, { heading: "Property Surveys", data: "Verify property boundaries and critical details", name: "property_surveys" }, { heading: "Elevation Drawings", data: "Show structure height and dimensions", name: "elevation_drawings" }, { heading: "Soil Test Reports", data: "Offer insights into soil composition and stability", name: "soil_test_report" }, { heading: "Utility Maps", data: "Share information about existing utilities (water, sewer, gas, electric)", name: "utility_map" }, { heading: "Architectural Plans", data: "Include floor plans, elevations, and cross-sections", name: "architectural_plans" }, { heading: "Engineering Reports", data: "Assess structural integrity and technical aspects", name: "engineering_report" }, { heading: "Permitting Documents", data: "Include permits obtained or applications submitted", name: "permitting_doc" }]?.map((each, idx) => (
                                                            <Form.Group as={Col} sm={6} controlId="formFileSm" className="mb-3 d-flex flex-column justify-content-between" key={idx}>
                                                                <Form.Label className="FW-medium"><span className="FW-bold">{each?.heading}: </span> {each?.data}.</Form.Label>
                                                                <Form.Control type="file" size="sm" name={each?.name} value={values[each?.name] ?? ""} onChange={handleChange} />
                                                            </Form.Group>

                                                        ))}
                                                    </Row>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formGridCity">
                                            <Form.Label className="FW-bold">Start Time</Form.Label>
                                            <Form.Select defaultValue="Choose" name="start_time" value={values?.start_time ?? ""} onChange={handleChange}>
                                                <option value="">Choose</option>
                                                <option value="Already Begun">Already Begun</option>
                                                <option value="0-3 Months">0-3 Months</option>
                                                <option value="3-6 Months">3-6 Months</option>
                                                <option >6-12 Months</option>
                                                <option >1-2 Years</option>
                                                <option >2-3 Years</option>
                                                <option >Not Sure</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formGridState">
                                            <Form.Label className="FW-bold">Project Type <subset style={{ color: "red" }}>*</subset></Form.Label>
                                            <Form.Select defaultValue="Choose" name="project_type" value={values?.project_type ?? ""} onChange={handleChange} isInvalid={!!errors?.project_type}>
                                                <option value="">Choose</option>
                                                <option value="Commercial Project">Commercial Project</option>
                                                <option value="Mixed-Use Project">Mixed-Use Project</option>
                                                <option value="Institutional Project">Institutional Project</option>
                                                <option value="Industrial Project">Industrial Project</option>
                                                <option value="Heavy Civil Project">Heavy Civil Project</option>
                                                <option value="Heavy Civil Project"> Residential Project</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formGridState">
                                            <Form.Label className="FW-bold">Budget <subset style={{ color: "red" }}>*</subset></Form.Label>
                                            <Form.Select defaultValue="Choose" name="budget" value={values?.budget ?? ""} onChange={handleChange} isInvalid={!!errors?.budget}>
                                                <option value="">Choose</option>
                                                <option value="Under $500k">Under $500k</option>
                                                <option value="$500k-$1M">$500k-$1M</option>
                                                <option value="$1M-$2M">$1M-$2M</option>
                                                <option value="$2M-$3M">$2M-$3M</option>
                                                <option value="$4M-$5M">$4M-$5M</option>
                                                <option value="$5M-$10M">$5M-$10M</option>
                                                <option value="$10M-$15M">$10M-$15M</option>
                                                <option value="$15M-$20M">$15M-$20M</option>
                                                <option value="Over $20M">Over $20M</option>
                                                <option value="Specific Budget Amount">Specific Budget Amount</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label className="FW-bold">
                                                Specific Budget Amount($)
                                            </Form.Label>
                                            <Form.Control type="text" disabled={!isBudget} />
                                        </Form.Group>
                                    </Row>

                                    <p className="FW-bold">NFPA Construction Types <subset style={{ color: "red" }}>*</subset></p>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formGridCity">
                                            <Form.Label className="FW-bold">Construction Type</Form.Label>
                                            <Form.Select defaultValue="Choose" name="construction_type" value={values?.construction_type ?? ""} onChange={handleChange} isInvalid={!!errors?.construction_type}>
                                                <option value="">Choose</option>
                                                <option value="Type I">Type I</option>
                                                <option value="Type II">Type II</option>
                                                <option value="Type III">Type III</option>
                                                <option value="Type IV">Type IV</option>
                                                <option value="Type Type I">Type V</option>
                                                <option value="Not Sure">Not Sure</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} className="mb-3" controlId="formGridState">
                                            <Form.Label className="FW-bold">211 Digit-Structural Designation</Form.Label>
                                            <Form.Select defaultValue="Choose" name="digit_stuct_designation" value={values?.digit_stuct_designation ?? ""} isInvalid={!!errors?.digit_stuct_designation}
                                                onChange={handleChange}>
                                                <option value="">Choose</option>
                                                <option value="First Digit-XOO">First Digit-XOO</option>
                                                <option value="Second Digit-OXO">Second Digit-OXO</option>
                                                <option value="Third Digit-OOX">Third Digit-OOX</option>
                                                <option value="Not Sure">Not Sure</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Accordion className="building-plans-accord my-3">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header className="FW-bold mb-2 FS-18">Construction type/ Structural Designation Guide:</Accordion.Header>
                                                <Accordion.Body>
                                                    <p className="FW-bold mb-2">For construction type:</p>
                                                    {/* <p className="mb-2"><span className="FW-semibold">Type IV:</span> Fire walls, exterior walls, and some interior elements are noncombustible; other interior elements are wood or timber (with specific size requirements Heavy timber, E.g. Mill Buildings).</p> */}
                                                    {[{ type: "Type I", data: "High fire resistance (e.g., concrete construction E.g. Parking Garages)" }, { type: "Type II", data: "Lower fire resistance than Type I (e.g., steel construction with or without fireproofing)" }, { type: "Type III", data: " Exterior walls are noncombustible; interior structural elements are wood (e.g., mixed masonry/wood buildings)" }, { type: "Type IV", data: "Fire walls, exterior walls, and some interior elements are noncombustible; other interior elements are wood or timber (with specific size requirements Heavy timber, E.g. Mill Buildings)" }, { type: "Type V", data: "Structural elements are typically wood or approved materials (common in residential construction , E.g. 2X4's)" }]?.map((each, idx) => (
                                                        <p className="mb-3" key={idx}>
                                                            <span className="FW-semibold">{each?.type} : </span>{each?.data}. </p>
                                                    ))}
                                                    <p className="FW-bold mb-2">For specific structural designations:</p>
                                                    <p className="mb-2"><span className="FW-semibold">First Digit (X00):</span> Exterior bearing walls Rating in Hours.</p>
                                                    <p className="mb-2"><span className="FW-semibold">Second Digit (0X0):</span> Supporting Column, Beam, Truss Ratings in Hours Loads from multiple floors.</p>
                                                    <p className="mb-2"><span className="FW-semibold">Third Digit (00X):</span> Floor construction Rating in Hours</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Row} controlId="formGridState1" className="mb-3">
                                            <Form.Label column sm="auto" className="FW-bold">
                                                Is this Project Approved For a Grant <subset style={{ color: "red" }}>*</subset>
                                            </Form.Label>
                                            <Col sm={3}>
                                                <Form.Select as={Col} defaultValue="Choose" name="project_approval" value={values?.project_approval ?? ""} onChange={handleChange} isInvalid={!!errors?.project_approval}>
                                                    <option>Choose</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="Application Pending">Application Pending</option>
                                                    <option value="Will Be Submitting Application">Will Be Submitting Application</option>
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formGridState1">
                                            <Form.Label column sm="auto" className="FW-bold">
                                                IF YES, What is the total award amount($)?
                                            </Form.Label>
                                            <Col sm={3}>
                                                <Form.Control type="text" name="projct_total_amt" value={values?.projct_total_amt ?? ""} onChange={handleChange}
                                                    disabled={!isTotalAmountEnabled} />
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Row} controlId="formGridState1">
                                            <Form.Label className="FW-bold">
                                                Description / Notes
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                type="text"
                                                placeholder="Enter Your Message"
                                                className="p-3 w-full"
                                                name="descriptions"
                                                isInvalid={errors?.descriptions}
                                                value={values.descriptions ?? ""}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mt-4 justify-content-end">
                                        <Button variant="secondary w-fit"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </Row>
                                </Form>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div >
        </>
    );
};

export default Header;
