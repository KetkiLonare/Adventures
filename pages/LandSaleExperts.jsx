import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav'
import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import sendHttpRequest from '@/src/http/Request'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const LandSaleExperts = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };
  const [testimonial, setTestimonial] = useState()

  const getData = async () => {
    try {
      const res = await sendHttpRequest("get", `/CRUD/testimonials`, {
        where: { is_deleted: false, is_active: true },
      }, {}, true)
      setTestimonial(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const landTestimonial =testimonial?.filter((each)=> (
    each?.testimonial_type === "Landsale"
  ));

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <section className='BG-gradient py-4'>
        <Container>
          <BreadcrumbNav page={"Land Sale Experts"} />
          <h2 className='FW-extrabold FS-28 mb-2'>Land Sale Experts</h2>
          <span className='FW-Medium FS-14'>Your Path to the Perfect Property</span>
        </Container>
      </section>
      <section className='landSaleExperts mb-5'>
        <Container>
          <Row>
            <Col>
              <div className='landSaleImg mt-4'>
                <Image src="/images/landSaleExperts.png" alt=''></Image>
              </div>
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
              <h2 className='FW-extrabold'> Land Sale Experts</h2>
              <p className='FW-medium perfectProperty mt-4 mb-3'>Your Path to the Perfect Property</p>
              <p className='FW-medium rightLand'>
                At Apex Modular Solutions, we understand that finding the right land for your dream modular wood house is a crucial step in bringing your vision to life. That's why we have a team of dedicated Land Sale Experts ready to assist you in every aspect of your land buying journey. With years of experience and a deep understanding of the real estate market, our experts are here to guide you towards the perfect property that complements your lifestyle and preferences.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <div className='my-14'>
        <PartnersAssociation />
      </div>
      <section className='getInTouchToday'>
        <Card className='rounded-none border-none'>
          <Card.Img src="/images/FinancingContactUs.png" alt="Card image" className='rounded-none' />
          <Card.ImgOverlay className="flex items-center">
            <Container>
              <Row>
                <Col md={8}>
                  <Card.Title className='FS-32 FW-extrabold text-white mb-4'>Ready to find the perfect land for your dream house? Take the first step today!</Card.Title>
                  <Card.Text className='FS-16 FW-regular text-white mb-0 w-75'>Our team of Land Sale Experts is here to assist you in finding the ideal location that matches your vision and requirements.</Card.Text>
                  <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                  <Card.Text className='FW-regular FS-14 w-75'>Contact us today to embark on your journey towards creating the home of your dreams! Our Land Sale Experts are here to make your vision a reality.</Card.Text>
                </Col>
              </Row>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </section>
      <section className='testimonialSlider py-5'>
      <Container>
          <h2 className="FW-extrabold text-center">Testimonials</h2>
          <Slider {...settings} className="mt-3">
            {landTestimonial?.length >=2 && landTestimonial?.map((each, idx) => (
                  <div
                    className="boxShadowPrimary py-3 px-4 testimonialCard d-flex flex-column justify-content-between"
                    key={idx}
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
                              e.target.src = "/images/watermark.jpg"; // Fallback to default image on error
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
            )
            )}
          </Slider>
        </Container>
      </section>
    </>
  )
}

export default LandSaleExperts
