import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import sendHttpRequest from '@/src/http/Request'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import TestimonialSlider from '@/components/TestimonialSlider/testimonialSlider'

const WhyApexModule = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2
    };
    const [testimonial, setTestimonial] = useState();

    const getData = async () => {
        try {
            // const res = await axios.get("http://localhost:4000/CRUD/testimonials", {
            //     params: {
            //         where: { is_deleted: false ,is_active:true},
            //     },
            // });

            const res = await sendHttpRequest("get", `/CRUD/testimonials`, {
                where: { is_deleted: false, is_active: true },
            }, {}, true)

            setTestimonial(res.data.result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="flex justify-center items-center py-10 BG-gradient">
                <h1 className='FS-28'>Why apex modular?</h1>
            </div>
            <Container className='affordHouse my-14'>
                <Row className='align-items-center justify-content-center justify-content-md-start'>
                    <Col className='col-10 col-md-6'>
                        <div className="yearsOfDesign">
                            <Image src="/images/whyapeximg.png" alt=""></Image>
                        </div>
                    </Col>
                    <Col className='col-10 col-md-6 mt-4 mt-md-0'>
                        <h2 className='FW-extrabold text-center text-md-start'>Apex Modular Solutions is dedicated to bringing affordable house.</h2>
                        <p className='FW-medium affordPara-1 my-3 text-justify text-md-start'>At Apex Modular Solutions, we believe that everyone deserves a safe and affordable place to call home. We are proud to partner with government and non-profit organizations to make this a reality.</p>
                        <p className='FW-medium affordPara-2 my-3 text-justify text-md-start'>Our modular solutions allow for quick and cost effective construction with minimal disruption to existing structures. We offer high quality homes with competitive pricing. You can design your fully customized tiny home with all the amenities you dream of. Our online showroom and user friendly design features make it simple to explore our large selection of floor models and customize them to fit your lifestyle and budget. Live a luxurious, sustainable life with our tiny homes all while reduing your environmental footprint.</p>
                        <div className="text-center text-md-start">
                            <button className='pinkBtn FW-bold FS-16 text-white borderRadius-5 py-2 px-4'>Order Now</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="BG-gradient meetOurBenefits py-5">
                <Container fluid>
                    <h2 className='FW-extrabold text-center'>Meet our benefits</h2>
                    <p className='text-center mt-4 mb-xl-5 mb-0'>The Most Advanced, Powerful And Innovative Solar Generator System</p>
                    <Row className='g-0 justify-content-xl-between justify-content-md-evenly justify-content-center'>
                        <Col className='col-12 col-xl-5 d-flex justify-content-center'>
                            <div className="meetOurBenefitsImg">
                                <Image src='/images/houseplan.png'></Image>
                            </div>
                        </Col>
                        <Col className='col-10 col-lg-4 col-md-5 col-xl-3'>
                            <Row>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>01</p></div>
                                <div className='col'>
                                    <h5 className='FW-semibold mb-2'>Professional builders</h5>
                                    <span className="FW-medium">Our team of skilled and experienced builders brings passion and dedication to every project .</span>
                                </div>
                            </Row>
                            <Row className='mt-md-14 mt-4 mb-8'>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>02</p></div>
                                <div className="col">
                                    <h5 className='FW-semibold mb-2'>Best wooden materials</h5>
                                    <span className="FW-medium">We understand the significance of natural beauty in your dream home. That's why we source only the best wooden materials for our modular wood houses.</span>
                                </div>
                            </Row>
                            <Row>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>03</p></div>
                                <div className="col">
                                    <h5 className='FW-semibold mb-2'>High speed construction</h5>
                                    <span className="FW-medium">We recognize the importance of timeliness in bringing your vision to life. With our streamlined construction processes and efficient project management.</span>
                                </div>
                            </Row>
                        </Col>
                        <Col className='col-10 col-lg-4 col-md-5 col-xl-3 mt-4 mt-md-0'>
                            <Row>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>04</p></div>
                                <div className='col'>
                                    <h5 className='FW-semibold mb-2'>Guarantee of durability</h5>
                                    <span className="FW-medium">Our commitment to using the finest materials and construction techniques ensures that your home is built to last for generations to come.</span>
                                </div>
                            </Row>
                            <Row className='my-8'>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>05</p></div>
                                <div className="col">
                                    <h5 className='FW-semibold mb-2'>Individual approach</h5>
                                    <span className="FW-medium">By adopting a client-centric approach, we create personalized modular houses that reflect your distinct personality and ensuring your dream home becomes a reality.</span>
                                </div>
                            </Row>
                            <Row>
                                <div className='outBorder px-0 col-auto'><p className='FW-extrabold mb-0'>06</p></div>
                                <div className="col">
                                    <h5 className='FW-semibold mb-2'>VIP service</h5>
                                    <span className="FW-medium">At Apex Modular Solutions, every client is a VIP. Our dedicated team of professionals is committed to providing a premium and seamless service experience.</span>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="workStages my-5">
                <Container>
                    <Row className='justify-content-md-evenly justify-content-center'>
                        <Col className='d-flex flex-column justify-content-center col-lg-5 col-md-6 col-11 text-justify order-2 order-md-1 mt-4 mt-md-0'>
                            <h2 className='FW-extrabold text-center text-md-start'>Stages of our work</h2>
                            <p className='FW-medium my-3 workStagePara-1'>We select the most high-quality wood materials, which have a very long life in any climatic conditions.</p>
                            <p className='FW-medium workStagePara-2'>With Apex Modular Solutions, each stage of our work is guided by our passion for innovation, sustainability, and craftsmanship. We take pride in building modular wood houses that are not only stunning but also align with your values and lifestyle. Let us be a part of making your dream home a reality.</p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center col-auto order-1 order-md-2' >
                            <div className="workStageImg">
                                <Image src='images/wamimage.png'></Image>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <div className='outBorder px-0'><p className='FW-extrabold mb-0'>02</p></div>
                            <p>Project development</p>
                        </Col>
                        <Col>..........</Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row> */}
                </Container>
            </div>
            <div className="ourAchievements py-5">
                <Container>
                    <h2 className='text-center mb-5 FW-extrabold'>Our Achievements</h2>
                    <Row>
                        <Col className='text-center col-md-3 col-sm-6 col-12'>
                            <i className='icon-award text-6xl'></i>
                            <h5 className='FW-extrabold mt-3'>Award-Winning Designs</h5>
                        </Col>
                        <Col className='text-center col-md-3 col-sm-6 col-12 mt-sm-0 mt-5'>
                            <i className='icon-successproject text-6xl'></i>
                            <h5 className='FW-extrabold mt-3'>Satisfied Clients</h5>
                        </Col>
                        <Col className='text-center col-md-3 col-sm-6 col-12 mt-md-0 mt-5'>
                            <i className='icon-satisfied text-6xl'></i>
                            <h5 className='FW-extrabold mt-3'>Successful Project</h5>
                        </Col>
                        <Col className='text-center col-md-3 col-sm-6 col-12 mt-md-0 mt-5'>
                            <i className='icon-satisfied text-6xl'></i>
                            <h5 className='FW-extrabold mt-3'>Successful Project</h5>
                        </Col>
                    </Row>
                </Container>
            </div>
            <TestimonialSlider />
            <section className='getInTouchToday'>
                <Card className='rounded-none border-none'>
                    <Card.Img src="/images/FinancingContactUs.png" alt="Card image" className='rounded-none' />
                    <Card.ImgOverlay className="flex items-center">
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <Card.Title className='FS-32 FW-extrabold text-white mb-4'>Get in Touch with Us!</Card.Title>
                                    <Card.Text className='FS-16 FW-regular text-white mb-0'>We're thrilled that you're interested in Apex Modular Solutions! Whether you're considering building your dream home,, or simply want to learn more about our commitment to affordable and sustainable living, we're here to assist you.</Card.Text>
                                    <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                                    <Card.Text className='FW-regular FS-14'>We value your interest in Apex Modular Solutions and look forward to making your vision of an affordable and high-quality home a reality.</Card.Text>
                                </Col>
                            </Row>
                        </Container>
                    </Card.ImgOverlay>
                </Card>
            </section>
            <div className="my-16">
                <PartnersAssociation />
            </div>
            {/* <Container>
                <Row className='getInTouchToday'>
                    <Col>
                        <div className='mt-4'>
                            <Image src='/images/whyapeximg.png' alt=''></Image>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h1 className='mt-5'>Apex Modular Solutions is dedicated to bringing affordable house.</h1>
                            <h6 className='mt-3'>The Most Advanced, Powerful And Innovative Solar Generator System</h6>
                            <p className='mt-4' style={{ fontStyle: " Medium", fontWeight: "16px", color: "#767676" }}>
                                Our modular solutions allow for quick and cost effective construction with minimal disruption to existing structures. We offer high quality homes with competitive pricing. You can design your fully customized tiny home with all the amenities you dream of. Our online showroom and user friendly design features make it simple to explore our large selection of floor models and customize them to fit your lifestyle and budget. Live a luxurious, sustainable life with our tiny homes all while reduing your environmental footprint.
                            </p>
                            <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                        </div>
                    </Col>
                </Row>
            </Container> */}
            {/* <Container className='solarTrustedBrand my-16'>
                <h2 className='FW-extrabold text-center'>Meet our benefits</h2>
                <p className='FW-medium text-center mt-3'>The Most Advanced, Powerful And Innovative Solar Generator System</p>
                <Row className='my-6'>
                    <Col className='flex justify-center'>
                        <div className="solarkImgDiv">
                            <Image src='/images/houseplan.png' alt=''></Image>
                        </div>
                    </Col>
                    <Col className=''>
                        <div className="flex mb-4">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>01</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>Professional builders</h5>
                                <span className='FW-medium'>Our team of skilled and experienced builders brings passion and dedication to every project .</span>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>02</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>Best wooden materials</h5>
                                <span className='FW-medium'>We understand the significance of natural beauty in your dream home. That's why we source only the best wooden materials for our modular wood houses.</span>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>03</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>High speed construction</h5>
                                <span className='FW-medium'>We recognize the importance of timeliness in bringing your vision to life. With our streamlined construction processes and efficient project management.</span>
                            </div>
                        </div>
                    </Col>
                    <Col className='flex flex-col justify-center'>
                        <div className="flex mb-4">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>04</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>Guarantee of durability</h5>
                                <span className='FW-medium'>Our commitment to using the finest materials and construction techniques ensures that your home is built to last for generations to come.</span>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>05</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>Individual approach</h5>
                                <span className='FW-medium'>By adopting a client-centric approach, we create personalized modular houses that reflect your distinct personality and ensuring your dream home becomes a reality.</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className='outBorder'><p className='FW-extrabold mb-0'>06</p></div>
                            <div className="solark ml-3">
                                <h5 className='FW-semibold mb-2'>VIP service</h5>
                                <span className='FW-medium'>At Apex Modular Solutions, every client is a VIP. Our dedicated team of professionals is committed to providing a premium and seamless service experience.</span>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <h1 className='mt-5'>Stages of our work</h1>
                                <h5 className='mt-4'>We select the most high-quality wood materials, which have a very long life in any climatic conditions.</h5>
                                <p className='mt-3'>With Apex Modular Solutions, each stage of our work is guided by our passion for innovation, sustainability, and craftsmanship. We take pride in building modular wood houses that are not only stunning but also align with your values and lifestyle. Let us be a part of making your dream home a reality.</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='whyApexModuleImg'>
                                <Image src='images/wamimage.png' alt=''></Image>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <div className='text-center '>
                    <ul className=" list-unstyled flex mb-4 whyApexModuleBrand mt-2 ml-5 mt-4">
                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>01</p></div>
                            <p className='para'>Project development</p>
                        </li>
                        <li><span className='test' >..........</span></li>

                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>02</p></div>
                            <p className='para'>Laying the foundation</p>
                        </li>
                        <li><span className='test' >..........</span></li>

                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>03</p></div>
                            <p className='para'>Assembly of log house</p>
                        </li>
                        <li><span className='test' >..........</span></li>

                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>04</p></div>
                            <p className='para'>Roofing</p>
                        </li>
                        <li><span className='test' >..........</span></li>

                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>05</p></div>
                            <p className='para'>Exterior finish</p>
                        </li>
                        <li><span className='test' >..........</span></li>

                        <li className='flex flex-column items-center'>
                            <div className='outBorderapex'><p className='FW-extrabold mb-0'>06</p></div>
                            <p className='para'>Interior finish</p>
                        </li>
                    </ul>
                </div>
            </Container>
            <section className='BG-gradientApex solariaQuality py-5'>
                <Container>
                    <Row className='justify-evenly '>
                        <h1 className='text-center' style={{ color: "white" }}> Our Achievements</h1>
                        <Col className='text-center mt-3'>
                            <i className='icon-award FS-44'></i>
                            <h5 style={{ color: "white" }}>Award-Winning Designs</h5>
                        </Col>
                        <Col className='text-center  mt-3'>
                            <i className='icon-successproject FS-44'></i>

                            <h5 style={{ color: "white" }}>Satisfied Clients</h5>
                        </Col>
                        <Col className='text-center  mt-3'>
                            <i className='icon-satisfied FS-44'></i>

                            <h5 style={{ color: "white" }}>Successful Project</h5></Col>
                        <Col className='text-center  mt-3'>
                            <i className='icon-satisfied FS-44'></i>

                            <h5 style={{ color: "white", textAlign: "center" }}>Successful Project</h5>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='testimonialSlider py-5'>
                <Container>
                    <h2 className='FW-extrabold text-center'>Testimonials</h2>
                    <Slider {...settings} className='mt-3'>
                        {testimonial?.map((each, idx) => (
                            <div className='boxShadowPrimary py-3 px-4 testimonialCard' key={idx}>
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
                                                e.target.src = "/images/watermark.jpg"; // Fallback to default image on error
                                              }}/>

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
            <section className='getInTouchToday'>
                <Card className='rounded-none border-none'>
                    <Card.Img src="/images/FinancingContactUs.png" alt="Card image" className='rounded-none' />
                    <Card.ImgOverlay className="flex items-center">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <Card.Title className='FS-28 FW-extrabold text-white mb-4'>Get in Touch Today</Card.Title>
                                    <Card.Text className='FS-20 FW-regular text-white mb-0'>We're thrilled that you're interested in Apex Modular Solutions! Whether you're considering building your dream home,, or simply want to learn more about our commitment to affordable and sustainable living, we're here to assist you.</Card.Text>
                                    <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                                    <Card.Text className='FW-regular FS-14'>We value your interest in Apex Modular Solutions and look forward to making your vision of an affordable and high-quality home a reality.</Card.Text>
                                </Col>
                            </Row>
                        </Container>
                    </Card.ImgOverlay>
                </Card>
            </section>
            <div>
                <PartnersAssociation />
            </div> */}



        </>
    )
}

export default WhyApexModule
