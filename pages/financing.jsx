import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import sendHttpRequest from "@/src/http/Request";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const Financing = () => {
  const [partner, setPartner] = useState();

  const getData = async () => {
    try {
      // const resData = await axios.get("http://localhost:4000/CRUD/partners",{params:{where:{is_active:true,is_deleted:false}}});
      const resData = await sendHttpRequest(
        "get",
        `/CRUD/financing`,
        { where: { is_active: true, is_deleted: false } },
        {},
        true
      );
      setPartner(resData?.data?.result);
    } catch (error) {
      console.log("fetching error data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="py-4 mb-5 financingTitleSection BG-gradient">
        <Container>
          <BreadcrumbNav page={"financing"}/>
          <h1 className="FW-extrabold FS-28 mb-2">Financing</h1>
          <span className="FW-medium">
            Affordable financing solution for your dream home
          </span>
        </Container>
      </section>
      <Container className="affordFinancingSection">
        <div className="row">
          <div className="col-10 mx-auto">
            <h2 className="text-center FW-extrabold mb-3">
              Affordable financing solution for your dream home
            </h2>
            <p className="text-center">
              At Apex Modular Solutions, we understand that financing is a
              crucial aspect of making your dream home a reality. That's why we
              offer a range of affordable financing solutions to help you
              achieve your housing goals. Our financing services are designed to
              provide you with the support and flexibility you need to make
              informed decisions and secure the funding that fits your unique
              situation.
            </p>
          </div>
        </div>
        <div class="row gx-0 gx-sm-5 mb-10 loanSavingsRow justify-content-center justify-content-sm-start ">
          {partner?.map((each, idx) => (
            <div class="col-sm-6 col-10" key={idx}>
              <div class="p-3">
                <div className="flex justify-center items-center py-5 borderRadius-10 financeImgBlock">
                  <div className="financeImage">
                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.financing_image}`}
                      alt="First image"
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />
                  </div>
                </div>
                {/* <h5 className='FW-extrabold mb-2 mt-4'>{each.tag_name}</h5> */}
                <h5 className="FS-16 FW-extrabold my-3">
                  {each?.financing_name}
                </h5>
                <p className="FW-regular">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: each?.descriptions,
                    }}
                  />
                </p>
                <Link
                  href={each?.financing_link}
                  className="FS-16 FW-semibold underline"
                  target="_blank" // This attribute opens the link in a new tab
                  rel="noopener noreferrer"
                >
                  Learn more about Home improvement loans
                </Link>
              </div>
            </div>
          ))}
          {/* <div class="col">
            <div class="p-3">
              <div className="flex justify-center items-center py-5 borderRadius-10 financeImgBlock">
                <div className="financeImage">
                  <img src="/images/usb-logo-community.svg" alt="" />
                </div>
              </div>
              <h5 className='FW-extrabold mb-2 mt-4'>Ulster Savings</h5>
              <span className='FS-16 FW-semibold block mb-3'>Community Matters</span>
              <p className='FW-regular mb-4'>Ulster Savings Bank caters exclusively to residents of NYS and offers traditional bank finance options. To avail the best finance options, kindly fill out the contact form, and one of USB's representatives will soon be in touch with you. Please note that Ulster Savings Bank does not operate in the 5 boroughs of New York.</p>
              <Link href="#" className='FS-16 FW-semibold underline'>Learn more about Uister saving</Link>
            </div>
          </div> */}
        </div>
      </Container>
      <section className="getInTouchToday">
        <Card className="rounded-none border-none">
          <Card.Img
            src="/images/FinancingContactUs.png"
            alt="Card image"
            className="rounded-none"
          />
          <Card.ImgOverlay className="flex items-center">
            <Container>
              <Row>
                <Col md={6}>
                  <Card.Title className="FS-32 FW-extrabold text-white mb-4">
                    Get in Touch Today
                  </Card.Title>
                  <Card.Text className="FS-16 FW-regular text-white mb-0">
                    Have questions or ready to explore financing options for
                    your dream modular home? Click the button below to contact
                    our financing team.
                  </Card.Text>
                  <Link href="/contactUs">
                    <Button className="FS-16 FW-bold border-none py-2 px-3 my-4">
                      Contact us
                    </Button>
                  </Link>
                  <Card.Text className="FW-regular FS-14">
                    At Apex Modular Solutions, we are dedicated to making your
                    homeownership dreams a reality. Reach out to us today, and
                    let's work together to create your ideal modular home.
                  </Card.Text>
                </Col>
              </Row>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </section>
      <section className="financeWhyChooseUs my-16">
        <Container>
          <h3 className="FW-extrabold text-center">
            Why Choose Us for Financing
          </h3>
          <div class="px-4 text-center">
            <div class="row gx-5 text-left my-3 justify-content-center justify-content-sm-start">
              <div class="col-10 col-sm-6 col-lg-3 p-3">
                <div class="p-3 boxShadowQuinary h-100 borderRadius-15">
                  <i className="icon-ExpertGuidance"></i>
                  <h5 className="FW-extrabold my-3">Expert Guidance</h5>
                  <p>
                    Benefit from the expertise of our financing specialists who
                    will guide you through the process, ensuring you make
                    well-informed decision.
                  </p>
                </div>
              </div>
              <div class="col-10 col-sm-6 col-lg-3 p-3">
                <div class="p-3 boxShadowQuinary h-100 borderRadius-15">
                  <i className="icon-TailoredSolution"></i>
                  <h5 className="FW-extrabold my-3">Tailored Solution</h5>
                  <p>
                    We offer flexible financing solutions that are customized to
                    fit your lifestyle and budget needs, making homeownership
                    accessible to more people.
                  </p>
                </div>
              </div>
              <div class="col-10 col-sm-6 col-lg-3 p-3">
                <div class="p-3 boxShadowQuinary h-100 borderRadius-15">
                  <i className="icon-EfficientService"></i>
                  <h5 className="FW-extrabold my-3">Efficient Service</h5>
                  <p>
                    Experience a streamlined and efficient financing service,
                    saving you time and minimizing any disruptions to your
                    housing plans.
                  </p>
                </div>
              </div>
              <div class="col-10 col-sm-6 col-lg-3 p-3">
                <div class="p-3 boxShadowQuinary h-100 borderRadius-15">
                  <i className="icon-AffordableHousing"></i>
                  <h5 className="FW-extrabold my-3">Affordable Housing</h5>
                  <p>
                    We are committed to making affordable housing available to
                    all, and our financing options play a crucial role in
                    achieving this goal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Financing;
