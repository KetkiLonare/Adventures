import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav'
import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const MaterialFinishes = () => {
    return (
        <>

            <div className="BG-gradient py-5">
                <div className="container">
                    <BreadcrumbNav page={"Material & Finishes"} />

                    <div className="row downloadBrochure">
                        <div className="col-5">
                            <h3 className='FW-extrabold'>Download Our Brochures for Inspiring Designs</h3>
                            <p className='FW-medium my-3'>Explore our wide selection of top-quality materials and exquisite finishes to bring your modular wood house to life. From sustainable and eco-friendly options to luxurious touches, Apex Modular Solutions offers a variety of choices that cater to diverse tastes and preferences.</p>
                            <button className='pinkBtn py-2 px-4 borderRadius-5 text-white FS-16 FW-bold'>Download Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-14'>
                <PartnersAssociation />
            </div>

            {/* <section>
                <Card className=" text-white">
                    <Card.Img src="/images/materialimg.png" alt="Card image" />
                    <Card.ImgOverlay className='ms-5'>
                        <BreadcrumbNav page={""} />
                        <h5 className='FW-extrabold ' style={{ fontSize: "28px", fontStyle: "" }}>Materials and Finishes</h5>
                        <Card.Text className='FW-medium'  style={{ fontSize: "14px",color:"#BBBBBB" }}>
                            Unleash Your Imagination with Our Exquisite Collection
                        </Card.Text>
                        <h1 className='mt-5' style={{ fontSize: "45px", color: "#F6FBFF" }}>Elevate Your <br />
                            Modular House  <br />
                            With Premium Choices</h1>
                    </Card.ImgOverlay>        
                </Card>
            </section>

            <section className='BG-gradient getInTouchToday'>
                <Container >
                    <Row>
                        <Col>
                            <h1 className='my-5'>Download Our Brochures for Inspiring <br />Designs</h1>
                            <p className='mb-2 FW-medium'style={{fontSize:"16px" ,color:"#767676"}}>Explore our wide selection of top-quality materials and exquisite finishes to <br/>bring your modular wood house to life. From sustainable and eco-friendly <br/>options to luxurious touches, Apex Modular Solutions offers a variety <br/>of choices that cater to diverse tastes and preferences.</p>
                            <Link href="/contactUs"><Button className='FS-16 FW-bold border-none py-2 px-3 my-4'>Contact us</Button></Link>
                        </Col>
                      
                    </Row>

                </Container>
            </section>
            <div>
                <PartnersAssociation />
            </div> */}


        </>
    )
}

export default MaterialFinishes
