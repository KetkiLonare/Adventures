import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import sendHttpRequest from "../src/http/Request";
import { Image } from "react-bootstrap";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const Footer = () => {
  const [proudMem, setProudMem] = useState();
  const [themedata, setThemedata] = useState();

  const getdata = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/proudmembers");
      const res = await sendHttpRequest(
        "get",
        "/CRUD/proudmembers",
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );

      setProudMem(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const getTheme = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        "/CRUD/themes_settings",
        {},
        {},
        true
      );
      setThemedata(res?.data?.result);
    } catch (error) {
      console.log("fetching data", error);
    }
  };
  useEffect(() => {
    getTheme();
  }, []);

  return (
    <>
      <footer className="py-5 footerTextBlue px-sm-0 px-3">
        <Container>
          <Row>
            <Col className="col-lg-4 col-7">
              <h4 className="mb-3">Contact Us</h4>
              {!!themedata?.length ? (
                themedata?.map((each, idx) => (
                  <>
                    <div key={idx}>
                      <p className="mb-2 d-flex align-items-center">
                        <i className="icon-phone me-2 fs-6"></i>{" "}
                        {each?.mobile_no ? each?.mobile_no : "845-393-1477"}|
                        866-APEX-777
                      </p>
                      <p className="d-flex align-items-center">
                        <i className="icon-envelope me-2 fs-5"></i>
                        {each?.email ? each?.email : "info@apexmodulars.com"}
                      </p>
                    </div>
                  </>
                ))
              ) : (
                <>
                  <div>
                    <p className="mb-2 d-flex align-items-center">
                      <i className="icon-phone me-2 fs-6"></i> 845-393-1477 |
                      866-APEX-777
                    </p>
                    <p className="d-flex align-items-center">
                      <i className="icon-envelope me-2 fs-5"></i>{" "}
                      info@apexmodulars.com
                    </p>
                  </div>
                </>
              )}
              <p className="my-4 text-white">
                Business Hours During Construction
              </p>
              <p className="mb-2 d-flex align-items-center">
                <i className="icon-clock me-2 fs-6"></i> Monday - Friday :
                9am-5pm
              </p>
              <p className="d-flex align-items-center">
                <i className="icon-clock me-2 fs-6"></i> Saturday : 12pm – 4pm
              </p>
            </Col>
            <Col className="text-white col-lg-3 col-5">
              <h4 className="mb-3">Quick Links</h4>
              <Link href="/faqs">
                <p>FAQ</p>
              </Link>
              <Link href="/career">
                <p>Career</p>
              </Link>
              <Link href="/WhyApexModule">
                <p>Why Apex Modular ?</p>
              </Link>
            </Col>
            <Col className="proudMembersSlider col-lg-5 col-12 mt-3 mt-lg-0 h-fit">
              <h4 className="mb-4 text-white">Proud Member Of</h4>
              {/* <div className="flex"> */}
              {/* {themes?.length  &&
                  themes.map((each, idx) => (
                    <div key={idx}>
                      <Image src={each?.logo} alt="" />
                    </div>
                  ))} */}
              {/* <div class="row align-items-start proudMembersLogo">
              {proudMem?.length && proudMem?.map((each, idx) => (<div key={idx} class="col-3 proudMembersImg">
                      <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.proudmem_image}`} alt="" />
                    </div>))} */}
              {/* <div class="col-2 proudMembersImg">
                      <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.proudmem_image}`} alt="" />
                    </div>
                    <div class="col-5 proudMembersImg">
                      <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.proudmem_image}`} alt="" />
                    </div>
                    <div class="col-2 proudMembersImg">
                      <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.proudmem_image}`} alt="" />
                    </div> */}
              {/* </div> */}
              {/* </div> */}
              <Swiper
                slidesPerView={4}
                spaceBetween={10}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                speed={2000}
                loop={true}
                className="mySwiper"
                modules={[EffectFade, Autoplay]}
              >
                {proudMem?.length &&
                  proudMem?.map((each, idx) => (
                    <>
                      <SwiperSlide className="bg-transparent w-fit">
                        <div className="proudMembersImg">
                          <Image
                            src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.proudmem_image}`}
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    </>
                  ))}
              </Swiper>
              {/* <div className="row">
                <div className="col proudMembersImg">

                </div>
                <div className="col proudMembersImg"></div>
                <div className="col proudMembersImg"></div>
                <div className="col proudMembersImg"></div>
              </div> */}
            </Col>
          </Row>

          {/* Here "ROW" not worked. So used "div" */}
          <div className="flex justify-content-lg-end justify-content-md-start justify-content-center items-center socialIcon mt-lg-0 mt-5">
            <span className="mr-2">FOLLOW US : </span>
            {themedata?.map((each, idx) => (
              <>
                <Link href="" className="text-decoration-none">
                  <Image
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.facebook}`}
                    alt=""
                  />
                </Link>
                <Link href="" className="text-decoration-none">
                  <Image
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.instagram}`}
                    alt=""
                  />
                </Link>
                <Link href="" className="text-decoration-none">
                  <Image
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.twitter}`}
                    alt=""
                  />
                </Link>
                <Link href="" className="text-decoration-none">
                  <Image
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.pinterest}`}
                    alt=""
                  />
                </Link>
              </>
            ))}
          </div>

          <Row className="justify-between mt-4">
            <Col className="FS-14 col-md-6 col-12 text-md-start text-center">
              {/* <ul className="text-white flex justify-between">
                            <li className="list-disc"><Link href="" className="text-white">Privacy Policy</Link></li>
                            <li className="list-disc"><Link href="" className="text-white">Disclaimer</Link></li>
                            <li className="list-disc"><Link href="" className="text-white">Terms of Use</Link></li>
                            <li className="list-disc"><Link href="" className="text-white">Site Map</Link></li>
                        </ul> */}
              <Link href="/privacypolicy" className="underline">
                Privacy Policy
              </Link>
              <span className="dot mx-2"></span>
              <Link href="/disclaimer" className="underline">
                Disclaimer
              </Link>
              <span className="dot mx-2"></span>
              <Link href="termandcondition" className="underline">
                Terms of Use
              </Link>
              <span className="dot mx-2"></span>
              <Link href="" className="underline">
                Sitemap
              </Link>
            </Col>
            <Col className="flex md:justify-end justify-center col-md-6 col-12 mt-md-0 mt-4">
              <span>
                © Copyright 2023 Apex Modular Solutions. All Rights Reserved
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
