import sendHttpRequest from '@/src/http/Request';
import { NEXT_PUBLIC_APP_ASSET_URL } from '@/src/utlis/envConfig';
import React, { useState, useEffect } from 'react'
import { Container, Image, Row,Col } from 'react-bootstrap';
import Slider from 'react-slick'

const TestimonialSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
        ]
      };
    const [testimonial, setTestimonial] = useState()
    const getData = async () => {
        try {
          // const res = await axios.get("http://localhost:4000/CRUD/testimonials", {
          //   params: {
          //     where: { is_deleted: false,is_active:true },
          //   },
          // });
          const res = await sendHttpRequest("get", `/CRUD/testimonials`, {
            where: { is_deleted: false, is_active: true },
          },{},true)
          setTestimonial(res.data.result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        getData()
      }, [])
  return (
    <section className='testimonialSlider py-5'>
        <Container>
          <h2 className='FW-extrabold text-center'>Testimonials</h2>
          <Slider {...settings} className='mt-3'>
            {testimonial?.map((each, idx) => (
              <div className='boxShadowPrimary py-3 px-4 testimonialCard d-flex flex-column justify-content-between' key={idx}>
                <Row>
                  <p ><div
                    dangerouslySetInnerHTML={{
                      __html: each?.descriptions,
                    }}
                  /></p>
                </Row>
                <Row className='items-center'>
                  <Col md={2}>
                    <div className='testimonialProfileImg'>
                      <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.testimonial_image}`} className='rounded-full' alt=''
                       onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }} />

                    </div>
                  </Col>
                  <Col className='text-left'>
                    <h5>{each?.name}</h5>
                    <p className='mb-0'>{each?.position}</p>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
  )
}

export default TestimonialSlider