import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import PartnersAssociation from "@/components/PartnershipSection/partnersAssociation";
import sendHttpRequest from "@/src/http/Request";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import Slider from "react-slick";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import TestimonialSlider from "@/components/TestimonialSlider/testimonialSlider";

const Compositetoilets = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const [testimonial, setTestimonial] = useState();

  const compositeTestimonials = testimonial?.filter(
    (each) => each?.testimonial_type === 'Composite'
  );

  console.log(compositeTestimonials,"compositeTestimonials")
  const getData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/testimonials`,
        {
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setTestimonial(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="BG-gradient py-4">
        <Container>
          <BreadcrumbNav page={"Composite toilets option"} />
          <h1 className="FW-extrabold FS-28 mb-2">Composite Toilets Option</h1>
          <span className="FW-Medium FS-14">
            Upgrade to Eco-Friendly Living Today!
          </span>
        </Container>
      </section>
      <section className="compositeToilets">
        <Container>
          <Row>
            <Col>
              <div className="compositeImgDiv">
                <Image src="/images/composite.png" alt=""></Image>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <h2 className="FW-extrabold"> Composite Toilets</h2>
              <p className="FW-Medium mt-3">
                A composting toilet is typically a waterless system that uses
                decomposition and evaporation to recycle human waste. It’s not
                an outhouse or even a port-o-potty, but a physical toilet that
                can convert solid waste into compost through the composting
                process.</p>
              <p>Not only do they compost human waste, but also toilet
                paper while still remaining odorless. They do this by creating
                an oxygen-rich environment that enables aerobic bacteria to
                break down the waste.</p>
              <p>They can be a great option for just about
                everyone since they come in different sizes, systems, and tank
                capacities. Composting toilets are particularly great for tiny
                homes, cabins, those living off the grid, and many also use them
                in their RVs.</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <div className="text-center BG-gradient">
          <Container className="envCompositeBenefit my-16">
            <h2 className="FW-extrabold text-center">
              Environmental Benefits of Composite Toilets
            </h2>
            <p className="FW-medium text-center mt-4 mb-5 mostAdvanced">
              The Most Advanced, Powerful And Innovative Solar Generator System
            </p>
            <Row>
              <Col className="d-flex justify-content-center">
                <div className="flex justify-center">
                  <Image src="/images/compositetoilet.png" alt=""></Image>
                </div>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <div className="flex mb-4 text-left">
                  <div className="outBorder">
                    <p className="FW-extrabold mb-0">01</p>
                  </div>
                  <div className="solark ml-3">
                    <h5 className="FW-semibold mb-2">Water Conservation</h5>
                    <span className="FW-medium">
                      The water-saving technology in composite toilets
                      significantly reduces water consumption, promoting water
                      conservation and contributing to a greener lifestyle.
                    </span>
                  </div>
                </div>
                <div className="flex mb-4 text-left">
                  <div className="outBorder">
                    <p className="FW-extrabold mb-0">02</p>
                  </div>
                  <div className="solark ml-3">
                    <h5 className="FW-semibold mb-2">
                      Reduced Environmental Impact
                    </h5>
                    <span className="FW-medium">
                      As a result of their low water usage and durable
                      construction, composite toilets have a reduced
                      environmental impact compared to traditional toilets.
                    </span>
                  </div>
                </div>
                <div className="flex text-left mb-4">
                  <div className="outBorder">
                    <p className="FW-extrabold mb-0">03</p>
                  </div>
                  <div className="solark ml-3">
                    <h5 className="FW-semibold mb-2">Eco-Friendly Materials</h5>
                    <span className="FW-medium">
                      Composite toilets are often made from eco-friendly
                      materials, such as recycled plastics or other sustainable
                      resources, reducing the demand for new raw materials and
                      promoting circular economy practices.
                    </span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="flex mb-4 text-left">
                  <div className="outBorder">
                    <p className="FW-extrabold mb-0">04</p>
                  </div>
                  <div className="solark ml-3">
                    <h5 className="FW-semibold mb-2">Energy Efficiency</h5>
                    <span className="FW-medium">
                      With their low water usage, composite toilets indirectly
                      contribute to energy conservation, as less energy is
                      required for water treatment and distribution.
                    </span>
                  </div>
                </div>
                <div className="flex mb-4 text-left">
                  <div className="outBorder">
                    <p className="FW-extrabold mb-0">05</p>
                  </div>
                  <div className="solark ml-3">
                    <h5 className="FW-semibold mb-2">
                      Supporting Sustainable Living
                    </h5>
                    <span className="FW-medium">
                      By choosing composite toilets for their modular wood
                      houses, homeowners actively support sustainable living and
                      eco-conscious practices, making a positive impact on the
                      environment.
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <div className="my-4">
        <PartnersAssociation />
      </div>
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
                    Upgrade to Eco-Friendly Living Today!
                  </Card.Title>
                  <Card.Text className="FS-16 FW-regular text-white mb-0">
                    Have questions or need assistance in choosing the right
                    composite toilet for your home? Our expert team is here to
                    guide you. Contact us today to learn more about the benefits
                    of composite toilets.
                  </Card.Text>
                  <Link href="/contactUs">
                    <Button className="FS-16 FW-bold border-none py-2 px-3 my-4">
                      Get In Touch{" "}
                    </Button>
                  </Link>
                  <Card.Text className="FW-regular FS-14">
                    Upgrade to an eco-friendly bathroom solution and be a part
                    of the <br /> green revolution.
                  </Card.Text>
                </Col>
              </Row>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </section>
      <section className="testimonialSlider py-5">
        <Container>
          {compositeTestimonials?.length >= 2 &&
          <>
          <h2 className="FW-extrabold text-center">Testimonials</h2>
          <Slider {...settings} className="mt-3">
            { 
              compositeTestimonials.map((each) => (
                <div
                  className="boxShadowPrimary py-3 px-4 testimonialCard"
                  key={each?.id}
                >
                  <Row>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: each?.descriptions,
                        }}
                      />
                    </p>
                  </Row>
                  <Row className="items-center">
                    <Col md={2}>
                      <div className="testimonialProfileImg">
                        <Image
                          src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.testimonial_image}`}
                          className="rounded-full"
                          alt=""
                          onError={(e) => {
                            e.target.src = '/images/watermark.jpg'; // Fallback to default image on error
                          }}
                        />
                      </div>
                    </Col>
                    <Col className="text-left">
                      <h5>{each?.name}</h5>
                      <p className="mb-0">{each?.position}</p>
                    </Col>
                  </Row>
                </div>
              ))}
          </Slider>
          </>
          
          }
         
        </Container>
      </section>
      {/* <TestimonialSlider/> */}
    </>
  );
};

export default Compositetoilets;

