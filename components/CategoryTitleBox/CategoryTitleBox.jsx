import { useAppContext } from "@/src/hooks/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Skeleton } from "../Loader/skeleton";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const CategoryTitleBox = ({
  id,
  name,
  quote,
  brochure,
  category_name,
  style_name,
  square_feet,
  no_of_bedrooms,
  no_of_bathrooms,
  ameneties,
  kitchen,
  dimensions

}) => {
  const router = useRouter();

  const { state, dispatch } = useAppContext();

  const handleRequestInformation = () => {
    if (router.pathname === `/requestInformation?id=${id}`) {
      quote;
    } else {
      router.push(`/requestInformation?id=${id}`);
    }
  };

  // --------Social Media Icon----------

  // const socials = [
  //     {
  //         outlet: "LinkedIn",
  //         href:
  //             "https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React",
  //         background: "#0a66c2",
  //         color: "white",
  //         label: "Share on LinkedIn",
  //         icon: <AiOutlineLinkedin />
  //     },
  //     {
  //         outlet: "Facebook",
  //         href:
  //             "https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
  //         background: "#3b5898",
  //         color: "white",
  //         label: "Share on Facebook",
  //         icon: <AiOutlineFacebook />
  //     },
  //     {
  //         outlet: "Twitter",
  //         href:
  //             "https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse",
  //         background: "#00aced",
  //         color: "white",
  //         label: "Share on Twitter",
  //         icon: <AiOutlineTwitter />
  //     },
  //     {
  //         outlet: "Email",
  //         href:
  //             "mailto:?subject=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!",
  //         background: "#dd4b39",
  //         color: "white",
  //         label: "Share via Email",
  //         icon: <AiOutlineMail />
  //     },
  //     {
  //         outlet: "SMS",
  //         href:
  //             "sms:?body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig",
  //         background: "#7bcb20",
  //         color: "white",
  //         label: "Share via SMS",
  //         icon: <AiOutlineMessage />
  //     }
  // ];

  const [menuActive, setMenuActive] = useState(false);
  const handleToggleMenu = () => {
    setMenuActive((menuActive) => !menuActive);
  };

  const downloadImage = (imgDownload) => {
    fetch(imgDownload) // Replace with the URL of the image you want to download
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = imgDownload.split("/").pop(); // Replace with the desired filename
        const event = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(event);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  // const socialLinks = socials.map((social, index) => {
  //     return (
  //         <Button
  //             as="a"
  //             href={social.href}
  //             target="_blank"
  //             rel="noreferrer"
  //             aria-label={social.label}
  //             role="button"
  //             key={index}
  //             style={{
  //                 backgroundColor: social.background,
  //                 color: social.color,
  //                 margin: "5px"
  //             }}
  //         >
  //             {social.icon}
  //         </Button>
  //     );
  // });



  return (
    <>
      {/* <div className="p-8 bg-white my-4 categoryTitleBox boxShadow position-relative">
        <h1 className="text-capitalize ">
          {name ? name : <Skeleton width="20%" height="1rem" />}
        </h1>
        <div className="flex pt-2">
          <div className="row">
            <div className={`col ${(ameneties === "None" || ameneties === "" || ameneties === "NA") ? "border-end-0" : "border-end"} mx-3 pe-3 ps-0 d-flex flex-column justify-content-around`}>
              <div>
                <span className="FS-12 categoryText text-uppercase">
                  CATEGORY: {" "}
                  {category_name ? category_name : <Skeleton width="20%" />}
                </span>
                <span className="FS-12 ms-3 categoryText text-uppercase">
                  STYLE: {" "}
                  {style_name ? style_name : <Skeleton width="20%" />}
                </span>
              </div>
              <div className="flex py-2 mx-0 typesOfRooms">
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Square feet"
                >
                  <i className="icon-area mr-2 FS-20"></i>
                  <span className="text-nowrap">{square_feet ? square_feet : "-----"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className={`${dimensions ? "d-flex justify-center items-center FW-medium" : "d-none"}`}
                  title="Dimensions"
                >
                  <i className="icon-floor-dimension mr-2 FS-20"></i>
                  <span className="text-nowrap">{dimensions ? dimensions : "-----"}</span>
                </div>
                <span className={`${dimensions ? "border-end mx-3" : "d-none"}`}></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Bedrooms"
                >
                  <i className="icon-bed mr-2 FS-20"></i>
                  <span>{no_of_bedrooms ? no_of_bedrooms : "------"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Bathrooms"
                >
                  <i className="icon-bath-tub mr-2 FS-20"></i>
                  <span>{no_of_bathrooms ? no_of_bathrooms : "------"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Kitchen"
                >
                  <i className="icon-kitchen mr-2 FS-18"></i>
                  <span>{kitchen ? kitchen : "-----"}</span>
                </div>

              </div>
            </div>
          </div>

          {kitchen || dimensions || ameneties ?
            <div className={`FS-20 d-flex flex-col FW-medium col-2 ps-2 pt-2.5`}>
              <p className={(ameneties == "None" || ameneties === "" || ameneties === "NA") ? 'd-none' : 'mb-0 FS-12 categoryText text-uppercase'}>Ameneties : <span className="FS-12">{ameneties ? ameneties : "NA"}</span></p>
            </div> : ""
          }
          <div className="col flex flex-col items-end justify-between">
            <div className="d-flex mb-2 like-share-download">
              <i
                className="icon-like border-2 p-2 rounded "
                style={{
                  color: state.wishlist.includes(id) ? "#ac124a" : "#767676",
                }}
                type="button"
                onClick={() =>
                  state.logout === false
                    ? dispatch({ type: "Wishlist", payload: id })
                    : dispatch({ type: "togglelogin", payload: true })
                }
                title="Like"
              ></i>

              {brochure ? (
                <i
                  className="icon-download border-2 p-2 rounded ms-3"
                  type="button"
                  onClick={() =>
                    downloadImage(`${NEXT_PUBLIC_APP_ASSET_URL}${brochure}`)
                  }
                  download
                  title="Download"
                ></i>
              ) : (
                ""
              )}

              <div className="d-flex align-items-center">
                {menuActive && (
                  <div className="d-flex flex-column position-absolute z-1 pt-2 pb-1 borderRadius-5 boxShadow shareSubMenus px-2">
                    <a
                      href="mailto:?subject=Beginners%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-envelope1" type="button"></i>
                    </a>

                    <a
                      href="https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-linkedin1" type="button"></i>
                    </a>

                    <a
                      href="https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-twitter" type="button"></i>
                    </a>

                    <a
                      href="https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-facebook2" type="button"></i>
                    </a>
                  </div>
                )}
                <i
                  className="icon-share border-2 p-2 rounded ms-3"
                  type="button"
                  onClick={handleToggleMenu}
                  aria-label="Share Button"
                  aria-expanded={menuActive}
                  role="button"
                  title="Share"
                ></i>
              </div>
            </div>
            <div className="mt-2">
              {router.pathname === `/requestInformation` ? (
                <button className="py-2 px-3 mr-2 FW-bold" onClick={quote}>
                  Request Information
                </button>
              ) : (
                <button
                  className="py-2 px-3 mr-2 FW-bold"
                  onClick={() => {
                    handleRequestInformation();
                  }}
                >
                  Request Information
                </button>
              )}
              <Link href={`/homeCustomization?id=${id}`}>
                <button className="py-2 px-3 FW-bold">Customize Your Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="row px-3 py-4 bg-white my-4 mx-0 categoryTitleBox boxShadow position-relative">
        <div className="col">
          <h1 className="text-capitalize ">
            {name ? name : <Skeleton width="20%" height="1rem" />}
          </h1>
          <div className="row">
            <div className={`col-auto ${(ameneties === "None" || ameneties === "" || ameneties === "NA") ? "border-end-0" : "border-end"} mx-3 pe-3 ps-0 d-flex flex-column justify-content-around`}>
              <div className="my-2">
                <span className="FS-12 categoryText text-uppercase">
                  CATEGORY: {" "}
                  {category_name ? category_name : <Skeleton width="20%" />}
                </span>
                <span className="FS-12 ms-3 categoryText text-uppercase">
                  STYLE: {" "}
                  {style_name ? style_name : <Skeleton width="20%" />}
                </span>
              </div>
              <div className="flex py-2 mx-0 typesOfRooms">
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Square feet"
                >
                  <i className="icon-area mr-2 FS-20"></i>
                  <span className="text-nowrap">{square_feet ? square_feet : "-----"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className={`${dimensions ? "d-flex justify-center items-center FW-medium" : "d-none"}`}
                  title="Dimensions"
                >
                  <i className="icon-floor-dimension mr-2 FS-20"></i>
                  <span className="text-nowrap">{dimensions ? dimensions : "-----"}</span>
                </div>
                <span className={`${dimensions ? "border-end mx-3" : "d-none"}`}></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Bedrooms"
                >
                  <i className="icon-bed mr-2 FS-20"></i>
                  <span>{no_of_bedrooms ? no_of_bedrooms : "------"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Bathrooms"
                >
                  <i className="icon-bath-tub mr-2 FS-20"></i>
                  <span>{no_of_bathrooms ? no_of_bathrooms : "------"}</span>
                </div>
                <span className="border-end mx-3"></span>
                <div
                  className="d-flex justify-center items-center FW-medium"
                  title="Kitchen"
                >
                  <i className="icon-kitchen mr-2 FS-18"></i>
                  <span>{kitchen ? kitchen : "-----"}</span>
                </div>

              </div>
            </div>
            {kitchen || dimensions || ameneties ?
              <div className={`FS-20 d-flex flex-col FW-medium col-auto ps-2 pt-2.5`}>
                
                <p className={(ameneties == "None" || ameneties === "" || ameneties === "NA") ? 'd-none' : 'mb-0 FS-12 categoryText text-uppercase'}>Ameneties : <span className="FS-12">{ameneties ? ameneties : "NA"}</span></p>
              </div> : ""
            }
          </div>
        </div>
        <div className="col-md-auto flex flex-col items-end justify-between shareIconDiv">
          <div className="d-flex mb-2 like-share-download">
            <i
              className="icon-like border-2 p-2 rounded "
              style={{
                color: state.wishlist.includes(id) ? "#ac124a" : "#767676",
              }}
              type="button"
              onClick={() =>
                state.logout === false
                  ? dispatch({ type: "Wishlist", payload: id })
                  : dispatch({ type: "togglelogin", payload: true })
              }
              title="Like"
            ></i>

            {brochure ? (
              <i
                className="icon-download border-2 p-2 rounded ms-3"
                type="button"
                onClick={() =>
                  downloadImage(`${NEXT_PUBLIC_APP_ASSET_URL}${brochure}`)
                }
                download
                title="Download"
              ></i>
            ) : (
              ""
            )}

            <div className="d-flex align-items-center">
              {menuActive && (
                <div className="d-flex flex-column position-absolute z-1 pt-2 pb-1 borderRadius-5 boxShadow shareSubMenus px-2">
                  <a
                    href="mailto:?subject=Beginners%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="icon-envelope" type="button"></i>
                  </a>

                  <a
                    href="https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="icon-linkedin1" type="button"></i>
                  </a>

                  <a
                    href="https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="icon-twitter" type="button"></i>
                  </a>

                  <a
                    href="https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="icon-facebook" type="button"></i>
                  </a>
                </div>
              )}
              <i
                className="icon-share border-2 p-2 rounded ms-3"
                type="button"
                onClick={handleToggleMenu}
                aria-label="Share Button"
                aria-expanded={menuActive}
                role="button"
                title="Share"
              ></i>
            </div>
          </div>
          <div className="mt-2">
            {router.pathname === `/requestInformation` ? (
              <button className="py-2 px-3 mr-2 FW-bold" onClick={quote}>
                Request Information
              </button>
            ) : (
              <button
                className="py-2 px-3 mr-2 FW-bold"
                onClick={() => {
                  handleRequestInformation();
                }}
              >
                Request Information
              </button>
            )}
            <Link href={`/homeCustomization?id=${id}`}>
              <button className="py-2 px-3 FW-bold">Customize Your Home</button>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="row px-3 py-4 bg-white my-4 mx-0 categoryTitleBox boxShadow position-relative">
        <div className="row justify-content-between">
          <div className="col-auto">
            <h1 className="text-capitalize ">
              {name ? name : <Skeleton width="20%" height="1rem" />}
            </h1>
          </div>
          <div className="col-auto flex flex-col items-end justify-between shareIconDiv">
            <div className="d-flex mb-2 like-share-download">
              <i
                className="icon-like border-2 p-2 rounded "
                style={{
                  color: state.wishlist.includes(id) ? "#ac124a" : "#767676",
                }}
                type="button"
                onClick={() =>
                  state.logout === false
                    ? dispatch({ type: "Wishlist", payload: id })
                    : dispatch({ type: "togglelogin", payload: true })
                }
                title="Like"
              ></i>

              {brochure ? (
                <i
                  className="icon-download border-2 p-2 rounded ms-3"
                  type="button"
                  onClick={() =>
                    downloadImage(`${NEXT_PUBLIC_APP_ASSET_URL}${brochure}`)
                  }
                  download
                  title="Download"
                ></i>
              ) : (
                ""
              )}

              <div className="d-flex align-items-center">
                {menuActive && (
                  <div className="d-flex flex-column position-absolute z-1 pt-2 pb-1 borderRadius-5 boxShadow shareSubMenus px-2">
                    <a
                      href="mailto:?subject=Beginners%20Guide%20to%20Jest%20Testing%20in%20React&body=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig%20Check%20out%20this%20new%20article%20on%20Jest%20testing%20in%20React!"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-envelope" type="button"></i>
                    </a>

                    <a
                      href="https://www.linkedin.com/shareArticle?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&title=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-linkedin1" type="button"></i>
                    </a>

                    <a
                      href="https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-twitter" type="button"></i>
                    </a>

                    <a
                      href="https://www.facebook.com/sharer.php?u=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-facebook" type="button"></i>
                    </a>
                  </div>
                )}
                <i
                  className="icon-share border-2 p-2 rounded ms-3"
                  type="button"
                  onClick={handleToggleMenu}
                  aria-label="Share Button"
                  aria-expanded={menuActive}
                  role="button"
                  title="Share"
                ></i>

                {/* <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                <i className='icon-share border-2 p-2 rounded'
                                    type="button"
                                    onClick={handleToggleMenu}
                                    aria-label="Share Button"
                                    aria-expanded={menuActive}
                                    role="button"
                                ></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                {/* {menuActive && (
                                <div className="position-absolute d-flex end-0 bottom-100">
                                    {socialLinks.map((link, index) => (
                                        <div
                                            key={index}
                                        // style={{
                                        //     position: "absolute",
                                        //     top: `${(index + 1) * 50}px`,
                                        //     transition: `top 0.2s ${index * 50}ms, left 0.2s ${index * 50}ms`
                                        // }}
                                        >
                                            {link}
                                        </div>
                                    ))}
                                </div>
                            )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-auto">
            <div className="my-2">
              <span className="FS-12 categoryText text-uppercase">
                CATEGORY: {" "}
                {category_name ? category_name : <Skeleton width="20%" />}
              </span>
              <span className="FS-12 ms-3 categoryText text-uppercase">
                STYLE: {" "}
                {style_name ? style_name : <Skeleton width="20%" />}
              </span>
              {/* <p className={(ameneties == "None" || ameneties === "" || ameneties === "NA") ? 'd-none' : 'mb-0 FS-12 categoryText text-uppercase'}>Ameneties : <span className="FS-12">{ameneties ? ameneties : "NA"}</span></p> */}
              <span className={(ameneties == "None" || ameneties === "" || ameneties === "NA") ? 'd-none' : 'FS-12 ms-3 categoryText text-uppercase'}>Ameneties : {ameneties}</span>
            </div>
            <div className="flex py-2 mx-0 typesOfRooms">
              <div
                className="d-flex justify-center items-center FW-medium"
                title="Square feet"
              >
                <i className="icon-area mr-2 FS-20"></i>
                <span className="text-nowrap">{square_feet ? square_feet : "-----"}</span>
              </div>
              <span className="border-end mx-3"></span>
              <div
                className={`${dimensions ? "d-flex justify-center items-center FW-medium" : "d-none"}`}
                title="Dimensions"
              >
                <i className="icon-floor-dimension mr-2 FS-20"></i>
                <span className="text-nowrap">{dimensions ? dimensions : "-----"}</span>
              </div>
              <span className={`${dimensions ? "border-end mx-3" : "d-none"}`}></span>
              <div
                className="d-flex justify-center items-center FW-medium"
                title="Bedrooms"
              >
                <i className="icon-bed mr-2 FS-20"></i>
                <span>{no_of_bedrooms ? no_of_bedrooms : "------"}</span>
              </div>
              <span className="border-end mx-3"></span>
              <div
                className="d-flex justify-center items-center FW-medium"
                title="Bathrooms"
              >
                <i className="icon-bath-tub mr-2 FS-20"></i>
                <span>{no_of_bathrooms ? no_of_bathrooms : "------"}</span>
              </div>
              <span className="border-end mx-3"></span>
              <div
                className="d-flex justify-center items-center FW-medium"
                title="Kitchen"
              >
                <i className="icon-kitchen mr-2 FS-18"></i>
                <span>{kitchen ? kitchen : "-----"}</span>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-md-end align-items-end mt-4 mt-md-0">
            <div className="titleBoxBtns">
              {router.pathname === `/requestInformation` ? (
                <button className="py-2 px-3 mr-2 FW-bold" onClick={quote}>
                  Request Information
                </button>
              ) : (
                <button
                  className="py-2 px-3 mr-2 FW-bold"
                  onClick={() => {
                    handleRequestInformation();
                  }}
                >
                  Request Information
                </button>
              )}
              <Link href={`/homeCustomization?id=${id}`}>
                <button className="py-2 px-3 FW-bold">Customize Your Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTitleBox;
