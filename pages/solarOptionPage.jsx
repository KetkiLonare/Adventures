import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav'
import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import TestimonialSlider from '@/components/TestimonialSlider/testimonialSlider'
import sendHttpRequest from '@/src/http/Request'
import { NEXT_PUBLIC_APP_ASSET_URL } from '@/src/utlis/envConfig'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Container, Image, Card, Row, Col, Button } from 'react-bootstrap'
import Slider from 'react-slick'

const SolarOptionPage = () => {

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
    
      useEffect(() => {
        getData()
      }, [])

      const solarTestimonial= testimonial?.filter((each)=>
         each?.testimonial_type === "Solar"
      );

      console.log(solarTestimonial,"solarTestimonial")
    
  return (
    <>
        <Container fluid className='px-0'>
            <Card className='solarBanner border-none text-white'>
                <Card.Img src="/images/solarOption.png" alt="Card image" className='rounded-none'/>
                <Card.ImgOverlay className='rounded-none px-20'>
                    <BreadcrumbNav page={"Solar Option"} />
                    <h1 className='text-white'>Solar Option</h1>
                    <span>Equip your home with renewal energy and save!</span>
                </Card.ImgOverlay>
            </Card>
        </Container>

        <section className="planningSection">
            <Container className="planningContainer py-10">
                <Row className='justify-evenly'>
                    <Col className="flex items-center" md={3}>
                    <p className="mb-0 pr-2">
                        <i className="icon-number FS-44"></i>
                    </p>
                    <h5 className="pl-2 FW-bold">
                        SAFETY FOR THE ENVIRONMENT
                    </h5>
                    </Col>
                    <Col className="flex items-center" md={3}>
                    <p className="mb-0 pr-2">
                        <i className="icon-number1"></i>
                    </p>
                    <h5 className="pl-2 FW-bold">
                        AVAILABILITY OF AN ENERGY SOURCE
                    </h5>
                    </Col>
                    <Col className="flex items-center" md={3}>
                    <p className="mb-0 pr-2">
                        <i className="icon-number2"></i>
                    </p>
                    <h5 className="pl-2 FW-bold">
                    INEXHAUSTIBILITY OF THE ENERGY SOURCE
                    </h5>
                    </Col>
                </Row>
            </Container>
        </section>

        <Container className='my-10 empowerYourHome'>
            <Row className='justify-between'>
                <Col md={6}>
                    <div className="empowerImgDiv">
                        <Image src='/images/Solaria.png' alt=''></Image>
                    </div>
                </Col>
                <Col md={5} className='flex flex-column justify-center'>
                    <h2 className='FW-extrabold'>Empower Your Home with Solar Panels</h2>
                    <p className='FW-regular my-4'>Solaria’s patented technology is leading the way in premium residential solar. Our flagship solar panel, Solaria PowerXT®, delivers greater than 20% efficiency, a sleek Pure Black™ design, shade resistance, and proven reliability through Solaria’s advanced cell design, superior panel architecture and innovative assembly techniques. Solaria’s high performance solar panels generate maximum power in minimum space. Solaria PowerXT® solar panels, the choice of discerning installers and homeowners, are designed and engineered in the U.S.</p>
                    <Link href="/contactUs"><button className='FW-bold FS-16 px-4 py-2 text-white borderRadius-5 w-fit'>Contact Us</button></Link>
                </Col>
            </Row>
        </Container>

        <section className='BG-gradient solariaQuality py-5'>
            <Container>
                <Row className='justify-evenly'>
                    <Col className='flex'>
                    <i className='icon-good-quality FS-44'></i>
                    <div className="bestPerformance ml-4">
                        <h5 className='FW-extrabold'>Best Performance</h5>
                        <p className='mt-2 mb-0'>Solaria PowerXT solar panels achieve 20+% efficiency and ultra-high output to maximize energy production on the roof.</p>
                    </div>
                    </Col >
                    <Col className='flex'>
                        <i className='icon-protect FS-44'></i>
                        <div className="bestPerformance ml-4">
                            <h5 className='FW-extrabold'>Comprehensive 30 Year Warranty Superior</h5>
                            <p className='mt-2 mb-0'>Quality and reliability backed by an industry leading 30-year Parts, Performance, & Labor warranty</p>
                        </div>
                    </Col>
                    <Col className='flex'>
                        <i className='icon-guarantee FS-44'></i>
                        <div className="bestPerformance ml-4">
                            <h5 className='FW-extrabold'>Advanced Technology</h5>
                            <p className='mt-2 mb-0'>PowerXT technology is designed to increase reliability by eliminating common failure points, and provides superior shade tolerance.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <Container className='solarTrustedBrand my-16'>
            <h2 className='FW-extrabold text-center'>The Brand You Can Trust!</h2>
            <p className='FW-medium text-center mt-3'>The Most Advanced, Powerful And Innovative Solar Generator System</p>
            <Row className='my-6'>
                <Col className='flex flex-col justify-center'>
                    <div className="flex mb-4">
                        <div className='outBorder'><p className='FW-extrabold mb-0'>01</p></div>
                        <div className="solark ml-3">
                            <h5 className='FW-semibold mb-2'>Fleet Management</h5>
                            <span className='FW-medium'>With Sol-Ark’s remote access features and app you are never out of touch to quickly repair or adjust any system without being on site.</span>
                        </div>
                    </div>
                    <div className="flex">
                    <div className='outBorder'><p className='FW-extrabold mb-0'>02</p></div>
                        <div className="solark ml-3">
                            <h5 className='FW-semibold mb-2'>Battery Agnostic</h5>
                            <span className='FW-medium'>Sol-Ark inverters also do not have expensive battery restrictions like other solar inverters do, and can be used with a wide variety of 48V battery chemistries, from lead to lithium.</span>
                        </div>
                    </div>
                </Col>
                <Col className='flex justify-center'>
                    <div className="solarkImgDiv">
                        <Image src='/images/solarkImg.png' alt=''></Image>
                    </div>
                </Col>
                <Col className='flex flex-col justify-center'>
                    <div className="flex text-right mb-4">
                        <div className="solark mr-3">
                            <h5 className='FW-semibold mb-2'>Warranty and Reliability</h5>
                            <span className='FW-medium'>Comes with our award winning iron clad warranty and our 7 day a week live Engineering Support to assist you in all your needs.</span>
                        </div>
                        <div className='outBorder'><p className='FW-extrabold mb-0'>03</p></div>
                    </div>
                    <div className="flex text-right">
                        <div className="solark mr-3">
                            <h5 className='FW-semibold mb-2'>Easy Install</h5>
                            <span className='FW-medium'>The Sol-Ark INVERTER comes with everything you need to install it. Nicely packaged for added efficiency.</span>
                        </div>
                        <div className='outBorder'><p className='FW-extrabold mb-0'>04</p></div>
                    </div>
                </Col>
            </Row>
        </Container>

        <Container className='dependableBattery'>
            <Row>
                <Col>
                    <div className="batteryImgDiv">
                        <Image src='/images/batteryImg.png' alt=''></Image>
                    </div>
                </Col>
                <Col>
                    <h2 className='FW-extrabold'>Dependable battery power solutions for renewable energy projects.</h2>
                    <p className='FW-regular my-3'>Our battery systems are the most powerful and capable solutions available, and we continue to remain on the frontier of innovation to bring the top performing and highest quality products to homes.</p>
                    {/* <ul>
                        <li className='customBullet d-flex align-items-baseline'>Latest nano-carbon battery from C&D Technologies, with 100 years of storage battery production experience.</li>
                        <li className='customBullet d-flex align-items-baseline'>Nano-technology provides 6-8x longer life than regular lead sealed batteries, lasting up to 3,000-4,000 cycles (10 years).</li>
                        <li className='customBullet d-flex align-items-baseline'>Comparable performance to pricey lithium batteries, but more affordable.</li>
                        <li className='customBullet d-flex align-items-baseline'>Operates down to -20 D eg F, perfect for remote cabins and unattended sites. Includes a 5-yearwarranty.</li>
                    </ul> */}
                    <div className="row">
                        <div className="customBullet"></div>
                        <p>Latest nano-carbon battery from C&D Technologies, with 100 years of storage battery production experience.</p>
                    </div>
                    <div className="row">
                        <div className="customBullet"></div>
                        <p>Nano-technology provides 6-8x longer life than regular lead sealed batteries, lasting up to 3,000-4,000 cycles (10 years).</p>
                    </div>
                    <div className="row">
                        <div className="customBullet"></div>
                        <p>Comparable performance to pricey lithium batteries, but more affordable.</p>
                    </div>
                    <div className="row">
                        <div className="customBullet"></div>
                        <p>Operates down to -20 D eg F, perfect for remote cabins and unattended sites. Includes a 5-yearwarranty.</p>
                    </div>
                </Col>
            </Row>
        </Container>

        <div className="my-16">
            <PartnersAssociation/>
        </div>

        <section className='getInTouchToday'>
            <Card className='rounded-none border-none'>
            <Card.Img src="/images/goSolar.png" alt="Card image" className='rounded-none' />
            <Card.ImgOverlay className="flex items-center">
                <Container>
                <Row>
                    <Col md={7}>
                    <Card.Title className='FS-32 FW-extrabold text-white mb-4'>Ready to Go Solar? Get in Touch Today!</Card.Title>
                    <Card.Text className='FW-regular FS-16 text-white mb-0'>Our team of solar experts is here to guide you towards a brighter, sustainable future. Whether you have questions about solar panels, batteries, or our solar bundles, we're here to help.</Card.Text>
                    <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                    <Card.Text className='FW-regular FS-14'>Contact us now, Join the renewable energy revolution and make a positive impact on the planet while enjoying long-term savings on your energy bills.</Card.Text>
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
            {solarTestimonial?.length >=2 && solarTestimonial?.map((each, idx) => (
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

export default SolarOptionPage