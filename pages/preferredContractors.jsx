import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav'
import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import sendHttpRequest from '@/src/http/Request'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import { NEXT_PUBLIC_APP_ASSET_URL } from '@/src/utlis/envConfig'
import TestimonialSlider from '@/components/TestimonialSlider/testimonialSlider'

const PreferredContractors = () => {

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
      },{},true)
      setTestimonial(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const preferredTestimonial =  testimonial?.filter((each)=> (
    each?.testimonial_type === "Preferred contractors"
  ))
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <section className='BG-gradient py-4'>
        <Container>
          <BreadcrumbNav page={"Preferred contractors"}/>
          <h1 className='FW-extrabold FS-28 mb-2'>Preferred contractors</h1>
          <span className='FW-Medium FS-14'>Building Together for a Bright Future</span>
        </Container>
      </section>
      <section className='prefferedContractor'>
        <Container>
          <Row>
            <Col>
              <div className='buildingTogetherImg mt-4'>
                <Image src="/images/preferredimg.png" alt=''></Image>
              </div>
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
              <h2 className='FW-extrabold my-4'>  Building Together for a Bright Future</h2>
              <p className='FW-Medium'>
                At Apex Modular Solutions, we believe in the power of collaboration, and our Preferred Contractors play a vital role in bringing our clients' dreams to life. As a preferred partner, you become an integral part of our journey towards creating innovative and sustainable modular wood houses. Here's why being a Preferred Contractor with us is a rewarding opportunity
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
                <Col md={6}>
                  <Card.Title className='FS-32 FW-extrabold text-white mb-4'>Get in Touch Today</Card.Title>
                  <Card.Text className='FS-16 FW-regular text-white mb-0'>Have questions or ready to explore financing options for your dream modular home? Click the button below to contact our financing team.</Card.Text>
                  <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                  <Card.Text className='FW-regular FS-14'>At Apex Modular Solutions, we are dedicated to making your homeownership dreams a reality. Reach out to us today, and let's work together to create your ideal modular home.</Card.Text>
                </Col>
              </Row>
            </Container>
          </Card.ImgOverlay>
        </Card>
      </section>
      <section className="testimonialSlider py-5">
      <Container>
          <h2 className="FW-extrabold text-center">Testimonials</h2>
          <Slider {...settings} className="mt-3">
            {preferredTestimonial?.length >=2 && preferredTestimonial?.map((each, idx) => (
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
      {/* <TestimonialSlider/> */}
    </>
  )
}

export default PreferredContractors
