import React, { useEffect, useState } from "react";
import { Col, Image, Row, Form, InputGroup, Card, Accordion, Button, Modal, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useAppContext } from "../src/hooks/UserContext";
import axios from "axios";
import sendHttpRequest from "@/src/http/Request";
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { AiFillCamera } from 'react-icons/ai';

import Link from "next/link";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_APP_API_URL, NEXT_PUBLIC_APP_ASSET_URL, NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY } from "@/src/utlis/envConfig";
import { useMemo } from "react";
import { BsSend } from "react-icons/bs";


const MyProfile = () => {
    const { state, dispatch } = useAppContext();
    const user = state.userdata;
    const [wishlist, setWishlist] = useState([]);
    const [getInfo, setGetInfo] = useState([]);
    const [getQuote, setGetQuote] = useState([]);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [customData, setCustomData] = useState();
    const [Default, setDefault] = useState();
    const [formOpen, setFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [viewdetails, setViewdetails] = useState({ view: false, data: null });
    const [valuesMsg, setValuesMsg] = useState('');
    // here is  function for send msg
    const [showSimpleForm, setShowSimpleForm] = useState(false);
    const [receiverMsg, setReceiverMsg] = useState([]);
    const [imageUrl, setImageUrl] = useState(''); // To store the selected image URL
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        new_password: '',
        confirm_password: '',
    });

    const httpPostMessage = async (QuoteId = null) => {
        try {
            const res = await sendHttpRequest(
                "post",
                `/CRUD/message/${state?.userdata?.id}`,
                {},
                {
                    message: valuesMsg, users: state?.userdata?.id
                    , sender_id: JSON.parse(sessionStorage.getItem('userdata') ?? {})?.user.id,
                    type: state?.userdata?.user_type,
                    getquote: { id: QuoteId }
                }
            );
            getMessage(QuoteId);
        } catch (e) {
            console.log(e)
        }
    }

    const getMessage = async (quotId = null) => {
        try {
            const res = await sendHttpRequest(
                "get",
                `/CRUD/message`,
                { where: { getquote: { id: quotId }, is_deleted: false, } }, {}, true
            );
            setReceiverMsg(res?.data?.result)
        } catch (e) {
            console.log(e)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const imgUpload = async (file) => {
        try {
            let formData = new FormData();
            formData.append("profilePic", file);

            const res = await sendHttpRequest("put", `/CRUD/users/${user?.id}`, {
                where: { users: { id: user?.id }, is_deleted: false },
            }, formData);

            dispatch({ type: "setuserdata", payload: { ...user, profilePic: res?.data?.profilePic } });

            sessionStorage.setItem(
                `${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`,
                JSON.stringify({
                    ...JSON.parse(sessionStorage.getItem(NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY)), user: {
                        ...JSON.parse(sessionStorage.getItem(NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY))?.user,
                        profilePic: res?.data?.profilePic
                    }
                })
            );

        } catch (e) {
            console.log(e);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImageUrl(reader.result);
            reader.readAsDataURL(file);
        }
        imgUpload(file);
    };

    const getwishlistdata = async () => {
        try {
            const res = await sendHttpRequest("get", `/authroute/wishlists`, {
                relations: [
                    "products",
                    "products.product_assets",
                    "products.categories",
                ],
                where: { users: { id: user?.id }, is_deleted: false },
            },)
            setWishlist(res?.data?.result);
        } catch (e) {
            console.log(e);
        }
    };

    const getInformationData = async () => {
        try {
            const res = await sendHttpRequest("get", `/authroute/getquote`, {
                relations: [
                    "products",
                    "products.categories",
                    "products.product_assets",],
                where: { users: { id: user?.id }, is_deleted: false },
            },)
            console.log(res, "res is here for get information");
            setGetInfo(res?.data?.result);
        } catch (e) {
            console.log(e);
        }
    };

    const handelLogout = async () => {
        window.location.replace('/')
        sessionStorage.removeItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`);
        dispatch({ type: "setuserdata", payload: null })
        dispatch({ type: "logout", payload: true });
    };

    const getdata = async () => {
        try {
            const res = await sendHttpRequest("get", `/authroute/getquote`, {
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

            res?.data?.result?.length && setGetQuote(res?.data?.result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const setuserdata = async () => {
        try {
            const res = await sendHttpRequest("get", `/CRUD/users/${user?.id}`, {}, {});

            if (res?.status == 200) {
                const { id, name, email, mobile_no, user_type } = res?.data?.result
                const user = { id, name, email, mobile_no, user_type }
                if (sessionStorage.getItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`) != null) {
                    const sessionStorageData = JSON.parse(sessionStorage.getItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`)
                    );
                    sessionStorageData.user = user
                    sessionStorage.setItem(`${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`, JSON.stringify(sessionStorageData));
                    dispatch({ type: "setuserdata", payload: sessionStorageData?.user })
                }
            }

        } catch (error) {
            console.log("fetching error", error)
        }

    }

    const updateUsers = async (field) => {
        try {
            const response = await sendHttpRequest("put", `/CRUD/users/${user?.id}`, {}, editedUser);
            if (response.status === 200) {
                await setuserdata()
            }
        } catch (error) {
            console.log("error", error)
        }

    }

    const getCategoryData = async () => {
        try {
            const response = await sendHttpRequest("get", `/authroute/customizedcategory`, { relations: ["customizesubcategory.customizeditems", "customizesubcategory"], where: { is_deleted: false } });
            setCustomData(response?.data?.result);
        } catch (error) {
            console.log("error is here", error);
        }
    }

    const getDefault = async () => {
        try {
            const res = await sendHttpRequest("get", "/authroute/default_product_item", { relations: ["customizeditems", "customizeditems.customizesubcategory", "products"], where: { is_deleted: false } });
            setDefault(res?.data?.result)
        } catch (error) {
            console.log("error is here", error)
        }
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password, new_password, confirm_password } = formData;
            if (!email || !password || !new_password || !confirm_password) {
                toast.error('All fields are mandatory');
                return;
            }

            const res = await axios.put(`${NEXT_PUBLIC_APP_API_URL}/auth/user/reset-password`, {
                email,
                password: password,
                new_password: new_password,
                confirm_password: confirm_password,
            });

            setFormData({
                // email: '',
                password: '',
                new_password: '',
                confirm_password: '',
            });

            if (res.status === 200) {
                toast.success('Password changed!');
            } else {
                toast.error('Failed to change password');

            }
        } catch (error) {
            console.error(error);

            toast.error('Failed to change password');
        }
    };

    const handleChangeMessage = (event) => {
        const { name, value } = event.target;
        setValuesMsg(value);
    };

    const handleSubmitMessage = async (id) => {
        await httpPostMessage(id);
        setValuesMsg('');
    }

    useMemo(() => {
        getwishlistdata();
    }, [state?.wishlist]);

    useEffect(() => {
        httpPostMessage()
    }, [])

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

    useEffect(() => {
        if (state?.userdata?.id) {
            getwishlistdata();
            getdata();
            getCategoryData();
            getDefault();
            getInformationData();
            getMessage();
            setEditedUser(state?.userdata)
            dispatch({ type: "clearCustomeSelection" });
            dispatch({ type: "clearEditCustomeSelection" });
        }
    }, [state?.userdata?.id,])

    return (
        <>
            <div>
                <Container>
                    <div className="d-flex flex-column flex-md-row gap-4 my-4 profilePageTab">
                        <div className="p-2 boxShadowPrimary bg-white borderRadius-10 h-fit d-flex flex-column justify-content-between tabButtonDiv">
                            <div>
                                <div className="d-flex px-2 align-items-center">
                                    <div>
                                        <div className="profile-upload">
                                            <label for="getval">
                                                <div className="profile-pic d-flex justify-content-center align-items-center">
                                                    {imageUrl ? (<Image src={imageUrl} alt="Selected Image" />) : (<Image id="profileImg" src={user?.profilePic ? `${NEXT_PUBLIC_APP_ASSET_URL}${user?.profilePic}` : '/images/profile.png'} alt="Selected Image" onError={() => {
                                                        document.querySelector("#profileImg").src = '/images/profile.png'
                                                    }} />)}
                                                    <i className="icon-camera"></i>
                                                </div>
                                            </label>
                                            <input type="File" name="profilePic" id="getval" className="d-none" onChange={handleImageChange}></input>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="FW-extrabold mb-0 mx-3 capitalize">
                                            {user?.name ? user?.name : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="my-3 border-bottom"></div>
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link FS-16 FW-bold d-flex align-items-center active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true"><span className="FS-20 me-2"><CgProfile /></span>Profile</button>
                                    <button className="nav-link FS-16 FW-bold d-flex align-items-center" id="v-pills-wishlist-tab" data-bs-toggle="pill" data-bs-target="#v-pills-wishlist" type="button" role="tab" aria-controls="v-pills-wishlist" aria-selected="false"><span className="FS-20 me-2"><AiOutlineHeart /></span>Wishlist</button>
                                    <button className="nav-link FS-16 FW-bold d-flex align-items-center" id="v-pills-order-tab" data-bs-toggle="pill" data-bs-target="#v-pills-order" type="button" role="tab" aria-controls="v-pills-order" aria-selected="false"><span className="FS-20 me-2"><AiOutlineShoppingCart /></span>Order</button>
                                    <button className="nav-link FS-16 FW-bold d-flex align-items-center" id="v-pills-getInfo-tab" data-bs-toggle="pill" data-bs-target="#v-pills-getInfo" type="button" role="tab" aria-controls="v-pills-getInfo" aria-selected="false"><span className="FS-20 me-2"><AiOutlineShoppingCart /></span>Information Form</button>
                                    <button className="nav-link FS-16 FW-bold d-flex align-items-center" id="v-pills-password-tab" data-bs-toggle="pill" data-bs-target="#v-pills-password" type="button" role="tab" aria-controls="v-pills-password" aria-selected="false"><span className="FS-20 me-2"><MdPassword /></span>Change Password</button>
                                </div>
                            </div>
                            <div className="border-top">
                                <button className="w-100 py-3 FS-16 FW-bold d-flex align-items-center px-3" onClick={handelLogout}><span className="FS-20 me-2"><BiLogOut /></span>Logout</button>
                            </div>

                        </div>
                        <div className="p-3 boxShadowPrimary bg-white borderRadius-10 overflow-x-hidden tabContentDiv">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active profile" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                                    <div className="pb-3 d-flex justify-content-between">
                                        <button className="FW-extrabold"> Personal info</button>
                                        <button className="FW-extrabold" onClick={() => { setIsEditMode(!isEditMode), isEditMode && updateUsers() }}>{isEditMode ? "Save" : "Edit"}</button>
                                    </div>
                                    <div className="py-3 border-bottom d-flex justify-content-between profile-name">
                                        <div>
                                            <div>
                                                <label for="fullName" className="FW-bold">
                                                    Name
                                                </label>
                                            </div>
                                            <div>
                                                {isEditMode ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editedUser?.name}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <span className="FW-medium">{user?.name}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 border-bottom d-flex justify-content-between profile-name">
                                        <div>
                                            <div>
                                                <label for="emailId" className="FW-bold">
                                                    Email address
                                                </label>
                                            </div>
                                            <div>
                                                {isEditMode ? (
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={editedUser?.email}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <span className="FW-medium">{user?.email}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 border-bottom d-flex justify-content-between profile-name">
                                        <div>
                                            <div>
                                                <label for="phoneNo" className="FW-bold">
                                                    Phone numbers
                                                </label>
                                            </div>
                                            <div>
                                                {isEditMode ? (
                                                    <input
                                                        type="tel"
                                                        name="mobile_no"
                                                        value={editedUser?.mobile_no}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <span className="FW-medium">{user?.mobile_no}</span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="tab-pane fade wishlistTabContent" id="v-pills-wishlist" role="tabpanel" aria-labelledby="v-pills-wishlist-tab" tabindex="0">
                                    <div className="pb-3">
                                        <h2 className="FW-extrabold">Wishlist</h2>
                                    </div>
                                    <div className="wishlistCardList pe-3">
                                        {!!wishlist?.length && wishlist?.map((each, idx) => (
                                            <div className="wishlistCard borderRadius-10 p-3 mb-3" key={idx}>
                                                <div className="row">
                                                    <div className="col">
                                                        {each?.products?.product_assets?.map((item, idx) => {
                                                            if (item.type == "product_card") {
                                                                return (
                                                                    <div className="wishlistCardImg" key={idx}>
                                                                        <Image
                                                                            key={idx}
                                                                            src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file
                                                                                }`}
                                                                            alt="First slide"
                                                                            onError={(e) => {
                                                                                e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                                                                            }}
                                                                        />
                                                                    </div>
                                                                );

                                                            }
                                                        }
                                                        )}

                                                    </div>
                                                    <div className="col">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h5 className="text-uppercase">{each?.products?.name}</h5>
                                                            <div className='text-decoration-none FS-20' type='button' onClick={() => ((state.logout === false) ? dispatch({ type: "Wishlist", payload: each?.products?.id }) : dispatch({ type: "togglelogin", payload: true }))}><i className='icon-like' style={{ color: (state?.wishlist?.includes(each?.products?.id)) ? '#ac124a' : '#d6d6d6' }} ></i></div>
                                                        </div>
                                                        <p className="wishlistCategory">Category : {each?.products?.categories?.name}</p>
                                                        <div className='row py-2 border-top border-bottom mx-0 w-full'>
                                                            <div className='col border-end d-flex justify-center items-center flex-col' title='Square feet'>
                                                                <i className='icon-area FS-24'></i>
                                                                <span className='FW-bold'>{each?.products?.square_feet}</span>
                                                            </div>
                                                            <div className='col border-end d-flex justify-center items-center flex-col' title='Bedrooms'>
                                                                <i className='icon-bed FS-24'></i>
                                                                <span className='FW-bold'>{each?.products?.no_of_bedrooms}</span>
                                                            </div>
                                                            <div className='col d-flex justify-center items-center flex-col' title='Bathrooms'>
                                                                <i className='icon-bath-tub FS-24'></i>
                                                                <span className='FW-bold'>{each?.products?.no_of_bathrooms}</span>
                                                            </div>
                                                        </div>
                                                        <Link href={`/requestInformation?id=${each?.products?.id}`}> View Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab" tabindex="0">
                                    <div className="pb-3">
                                        <h2 className="FW-extrabold">{viewdetails?.data?.products?.name ? viewdetails?.data?.products?.name : "Orders"}</h2>
                                    </div>
                                    <div className="row profileOrderCard">
                                        <div className="col-12 mx-auto  mb-3">
                                            {!viewdetails?.view ?
                                                <Accordion>
                                                    {!!getQuote?.length && getQuote?.map((quotedata, idx) => (

                                                        <Accordion.Item eventKey={idx} key={idx} className="mb-3 rounded border mainAccordItem d-flex flex-column">

                                                            <Accordion.Header className="mainAccordHeader">
                                                                {/* <div className="flex justify-content-between w-100"> */}
                                                                <div className="d-flex">
                                                                    <div className="me-3">
                                                                        {quotedata?.products?.product_assets.map((item, index) => {
                                                                            if (item.type == "product_card") {
                                                                                return (
                                                                                    <div className="productOrderImg" key={index}>
                                                                                        <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file}`} className="borderRadius-5" alt="..."
                                                                                            onError={(e) => {
                                                                                                e.target.src = "/images/Latest_news.png";
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })}

                                                                    </div>
                                                                    <div className="ms-3 d-flex align-items-center">
                                                                        <div className="card-body d-flex flex-column justify-content-evenly py-0 h-100">
                                                                            <h5 className="card-title FW-bold FS-16 text-uppercase">{quotedata?.products?.name}</h5>
                                                                            <div className="category my-2">CATEGORY : {quotedata?.products?.categories?.name}</div>
                                                                            <div className='row mx-0 w-full'>
                                                                                <div className='col-auto px-0 d-flex justify-center align-items-center' title='Square feet'>
                                                                                    <i className='icon-area fs-4'></i>
                                                                                    <span className='FW-bold FS-12 mx-2'>{quotedata?.products?.square_feet} sqft</span>
                                                                                </div>
                                                                                <div className='col-auto px-2 d-flex justify-center align-items-center' title='Bedrooms'>
                                                                                    <i className='icon-bed fs-4'></i>
                                                                                    <span className='FW-bold FS-12 mx-2'>{quotedata?.products?.no_of_bedrooms}</span>
                                                                                </div>
                                                                                <div className='col-auto  px-0 d-flex justify-center align-items-center' title='Bathrooms'>
                                                                                    <i className='icon-bath-tub fs-4'></i>
                                                                                    <span className='FW-bold FS-12 mx-2'>{quotedata?.products?.no_of_bathrooms}</span>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* </div> */}

                                                            </Accordion.Header>
                                                            <div className="d-flex justify-content-end">
                                                                <Button onClick={() => window.location.href = `/homeCustomizationEdit?id=${quotedata?.products?.id}&quoteid=${quotedata?.id}`} className="align-self-end mx-3 infoButton " >Modify</Button>
                                                                {/* <Button onClick={()=>setViewdetails({view:true,data:quotedata})} className="align-self-end mx-3 text-dark">View Message</Button> */}
                                                                <Button className="align-self-end mx-3 infoButton " onClick={() => { setShowSimpleForm(!showSimpleForm), getMessage(quotedata?.id) }}> Message</Button>
                                                            </div>
                                                            {showSimpleForm && (
                                                                <div className="chat-page card shadow p-3 ">
                                                                    <div className="msg-inbox">
                                                                        <div className="chats" style={{ overflow: "auto", maxWidth: "100%" }}>
                                                                            <div className="msg-page">
                                                                                {receiverMsg?.map((each, idx) => (
                                                                                    <div className="message-container" key={idx}>
                                                                                        {each.type === "user" ? (
                                                                                            <div className="received-chats">
                                                                                                <div className="received-chats-img">
                                                                                                    <img src="/images/client_img.jpg" alt="" className="img-fluid" />
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
                                                                                                    <img src="/images/admin_img.png" alt="User" className="img-fluid" />

                                                                                                    {/* <img src={AdminPng} alt="User" className="img-fluid" /> */}
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
                                                                                <Button className="send-icon" onClick={() => handleSubmitMessage(quotedata?.id)}>
                                                                                    <BsSend />
                                                                                </Button>
                                                                            </InputGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )}

                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    {customData?.map((each, idx) => (
                                                                        <Accordion.Item eventKey={idx} className="mb-3 rounded innerExterior" key={idx}>
                                                                            <Accordion.Header >
                                                                                <i className='icon-exterior fs-4'></i><span className="mx-2 interior">{each?.name}</span>
                                                                            </Accordion.Header>
                                                                            <Accordion.Body>
                                                                                <div className="add-exterior">
                                                                                    <h6>Custom</h6>
                                                                                </div>
                                                                                <div className="row">
                                                                                    {each?.customizesubcategory?.map((subcategory, idx) => (


                                                                                        !!quotedata?.user_quote_items?.length && quotedata?.user_quote_items.map((item, idx) => {
                                                                                            if (item?.customizeditems?.customizesubcategory?.id == subcategory.id) {
                                                                                                return (

                                                                                                    <div className="col-lg-4 d-flex my-3" key={idx}>
                                                                                                        <div className="title-name" key={idx}>
                                                                                                            {item?.customizeditems?.customizesubcategory?.name}

                                                                                                            <Card  >
                                                                                                                <div className="tabsCardImgDiv mx-auto relative">
                                                                                                                    <Card.Img variant="top" className="borderRadius-5" src={`${NEXT_PUBLIC_APP_ASSET_URL}${item.customizeditems?.item_image}`} alt="" />
                                                                                                                </div>
                                                                                                                <Card.Body
                                                                                                                    className="pt-2 pb-2.5"
                                                                                                                    type="button"
                                                                                                                >
                                                                                                                    <Card.Title className="FS-14 FW-semibold mb-0.5">{item?.customizeditems?.name}</Card.Title>
                                                                                                                    <Card.Text className="FS-10">Brand : {item?.customizeditems?.customizedbrands?.name}</Card.Text>
                                                                                                                </Card.Body>
                                                                                                            </Card>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                        })

                                                                                    ))}
                                                                                </div>
                                                                            </Accordion.Body>
                                                                            <Accordion.Body>
                                                                                <div className="add-exterior">
                                                                                    <h6>Default</h6>
                                                                                </div>
                                                                                <div className="row">
                                                                                    {each?.customizesubcategory?.map((subcategory, idx) => (

                                                                                        !!Default?.length && Default?.map((def, idx) => {
                                                                                            if (def?.products?.id == quotedata?.products?.id && def?.customizeditems?.customizesubcategory?.id == subcategory.id) {
                                                                                                return (
                                                                                                    <div className="col-lg-4 d-flex my-3" key={idx}>
                                                                                                        <div className="title-name" key={idx}>
                                                                                                            {def?.customizeditems?.customizesubcategory?.name}
                                                                                                            {/* <div className="mt-5 position-relative products">
                                                      <img src={`${NEXT_PUBLIC_APP_ASSET_URL}${def.customizeditems?.item_image}`} alt="" />
                                                      <div className="position-absolute bottom-0 start-0 p-3">
                                                        <div className="customer-name">{def?.customizeditems?.name}</div>
                                                        <div className="certified"> Brand :  {def?.customizeditems?.customizedbrands?.name} </div>
                                                      </div>
                                                    </div> */}
                                                                                                            <Card  >
                                                                                                                <div className="tabsCardImgDiv mx-auto relative">
                                                                                                                    <Card.Img variant="top" className="borderRadius-5" src={`${NEXT_PUBLIC_APP_ASSET_URL}${def.customizeditems?.item_image}`} alt="" />
                                                                                                                </div>
                                                                                                                <Card.Body
                                                                                                                    className="pt-2 pb-2.5"
                                                                                                                    type="button"
                                                                                                                >
                                                                                                                    <Card.Title className="FS-14 FW-semibold mb-0.5">{def?.customizeditems?.name}</Card.Title>
                                                                                                                    <Card.Text className="FS-10">Brand : {def?.customizeditems?.customizedbrands?.name}</Card.Text>


                                                                                                                </Card.Body>
                                                                                                            </Card>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                )
                                                                                            }
                                                                                        })

                                                                                    ))}
                                                                                </div>
                                                                            </Accordion.Body>
                                                                        </Accordion.Item>
                                                                    ))}
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))}

                                                </Accordion>

                                                : <>
                                                    <button onClick={() => setViewdetails({ view: false, data: null })} >back</button>
                                                    <div className="d-flex">
                                                        <div className="me-3">
                                                            {viewdetails?.data?.products?.product_assets.map((item, index) => {
                                                                if (item.type == "product_card") {
                                                                    return (
                                                                        <div className="productOrderImg" key={index}>
                                                                            <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file}`} className="borderRadius-5" alt="..."
                                                                                onError={(e) => {
                                                                                    e.target.src = "/images/Latest_news.png";
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            })}

                                                        </div>
                                                        <div className="ms-3 d-flex align-items-center">
                                                            <div className="card-body d-flex flex-column justify-content-evenly py-0 h-100">
                                                                <h5 className="card-title FW-bold FS-16 text-uppercase">{viewdetails?.data?.products?.name}</h5>
                                                                <div className="category my-2">CATEGORY : {viewdetails?.data?.products?.categories?.name}</div>
                                                                <div className='row mx-0 w-full'>
                                                                    <div className='col-auto px-0 d-flex justify-center align-items-center' title='Square feet'>
                                                                        <i className='icon-area fs-4'></i>
                                                                        <span className='FW-bold FS-12 mx-2'>{viewdetails?.data?.products?.square_feet} sqft</span>
                                                                    </div>
                                                                    <div className='col-auto px-2 d-flex justify-center align-items-center' title='Bedrooms'>
                                                                        <i className='icon-bed fs-4'></i>
                                                                        <span className='FW-bold FS-12 mx-2'>{viewdetails?.data?.products?.no_of_bedrooms}</span>
                                                                    </div>
                                                                    <div className='col-auto  px-0 d-flex justify-center align-items-center' title='Bathrooms'>
                                                                        <i className='icon-bath-tub fs-4'></i>
                                                                        <span className='FW-bold FS-12 mx-2'>{viewdetails?.data?.products?.no_of_bathrooms}</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>}
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade " id="v-pills-getInfo" role="tabpanel" aria-labelledby="v-pills-getInfo-tab" tabindex="0">
                                    <div className="pb-3">
                                        <h2 className="FW-extrabold">Get Information</h2>
                                    </div>
                                    <div className="row profileOrderCard">
                                        <div className="col-12  mb-3">
                                            {!!getInfo?.length && getInfo.map((each, idx) => (
                                                <Card key={idx} className="mb-3 rounded border">
                                                    <div className="card-body d-flex " style={{ height: "130px" }}>
                                                        <div className="">
                                                            {each?.products?.product_assets.map((item, index) => {
                                                                if (item.type === "product_card") {
                                                                    return (
                                                                        <div className="productOrderImg" key={index}>
                                                                            <Card.Img
                                                                                src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file}`}
                                                                                className="borderRadius-5"
                                                                                alt="..."
                                                                                onError={(e) => {
                                                                                    e.target.src = "/images/Latest_news.png";
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    );
                                                                }
                                                            })}
                                                        </div>
                                                        <div className="ms-3 d-flex flex-column  py-0">
                                                            <h5 className="card-title FW-bold FS-16 text-uppercase ">{each?.products?.name}</h5>
                                                            <div className="category my-2">CATEGORY: {each?.products?.categories?.name}</div>
                                                            <div className="row mx-0 w-full">
                                                                <div className="col-auto px-0 d-flex justify-center align-items-center" title="Square feet">
                                                                    <i className="icon-area fs-4"></i>
                                                                    <span className="FW-bold FS-12 mx-2">{each?.products?.square_feet} sqft</span>
                                                                </div>
                                                                <div className="col-auto px-2 d-flex justify-center align-items-center" title="Bedrooms">
                                                                    <i className="icon-bed fs-4"></i>
                                                                    <span className="FW-bold FS-12 mx-2">{each?.products?.no_of_bedrooms}</span>
                                                                </div>
                                                                <div className="col-auto px-0 d-flex justify-center align-items-center" title="Bathrooms">
                                                                    <i className="icon-bath-tub fs-4"></i>
                                                                    <span className="FW-bold FS-12 mx-2">{each?.products?.no_of_bathrooms}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex">
                                                            <Link href={`/requestInformation?id=${each?.products?.id}`} className="infoview">
                                                                View Details
                                                            </Link>
                                                            <button onClick={() => setFormOpen(!formOpen)} className="ms-2 infoButton">
                                                                View Form
                                                            </button>

                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                {formOpen &&
                                    <>
                                        <div className="fw-bold">Get Information Form</div>
                                        {getInfo?.length && getInfo.map((each, idx) => (
                                            <div key={idx}>

                                                <Modal show={formOpen} onHide={() => setFormOpen(false)} dialogClassName="modal-70w" className="commercial-form">
                                                    <Modal.Header closeButton className="border-bottom-0 px-5 py-2">
                                                        <Modal.Title><h5 className="FW-extrabold">Get Information FORM</h5></Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className="px-5">
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="fw-bold w-50">Customer Name</td>
                                                                    <td>{each?.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">Customer Mobile.No</td>
                                                                    <td>{each?.mobile_no}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">Customer Email</td>
                                                                    <td>{each?.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">What's your preferred method of contact?</td>
                                                                    <td>{each?.contact_method}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">Where do you plan on placing the home?</td>
                                                                    <td>{each?.plan_home}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">When are you planning to build?</td>
                                                                    <td>{each?.month}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-bold w-50">Customer Message</td>
                                                                    <td className="text-justify">{each?.quote}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Modal.Body>
                                                </Modal>
                                            </div>

                                        ))

                                        }

                                    </>
                                }


                                <div className="tab-pane fade" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab" tabindex="0">
                                    <Form onSubmit={handleSubmit} className="changePasswordForm">
                                        <Form.Group className="mb-3" as={Row} controlId="formGroupOldPass">
                                            <Form.Label className="FW-semibold">Email</Form.Label>
                                            <Col md={6}>
                                                <InputGroup>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter Email"
                                                        name="email"
                                                        value={formData?.email}
                                                        onChange={handleChange}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mb-3" as={Row} controlId="formGroupOldPass">
                                            <Form.Label className="FW-semibold">Old Password</Form.Label>
                                            <Col md={6}>
                                                <InputGroup>
                                                    <Form.Control type={showOldPassword ? 'text' : 'password'} className="shadow-none" placeholder="Enter password" name="password"
                                                        value={formData?.password}
                                                        onChange={handleChange} />
                                                    <InputGroup.Text onClick={() => setShowOldPassword(!showOldPassword)} style={{ cursor: 'pointer' }}>
                                                        {showOldPassword ? <BsEyeSlash /> : <BsEye />}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mb-3" as={Row} controlId="formGroupNewPass">
                                            <Form.Label className="FW-semibold">New Password</Form.Label>
                                            <Col md={6}>
                                                <InputGroup>
                                                    <Form.Control type={showNewPassword ? 'text' : 'password'} className="shadow-none"
                                                        placeholder="Enter Password"
                                                        name="new_password"
                                                        value={formData?.new_password}
                                                        onChange={() => handleChange}
                                                    />
                                                    <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)} style={{ cursor: 'pointer' }}>
                                                        {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mb-3" as={Row} controlId="formGroupConfirmPass">
                                            <Form.Label className="FW-semibold">Confirm Password</Form.Label>
                                            <Col md={6}>
                                                <InputGroup>
                                                    <Form.Control type={showConfirmPassword ? 'text' : 'password'} className="shadow-none"
                                                        placeholder="Enter Password"
                                                        name="confirm_password"
                                                        value={formData.confirm_password}
                                                        onChange={handleChange}
                                                    />
                                                    <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                                                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        {/* <button className="pinkBtn text-white FW-semibold py-2 px-4 borderRadius-5">Submit</button> */}
                                        <button type="submit" className="ms-2 infoButton">
                                            Save
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container >
            </div >

        </>
    );
};
export default MyProfile;
