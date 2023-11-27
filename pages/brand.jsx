import React, { useEffect, useState } from 'react'
import BreadcrumbNav from '@/components/BreadcrumbNav/BreadcrumbNav'
import PartnersAssociation from '@/components/PartnershipSection/partnersAssociation'
import Link from 'next/link'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import sendHttpRequest from '@/src/http/Request'
import { NEXT_PUBLIC_APP_ASSET_URL } from '@/src/utlis/envConfig'
import { useRouter } from "next/router";


const Brand = () => {
    const [brands, setBrands] = useState([]);
    const [upcomingBrands, setUpcomingBrands] = useState([]);
    console.log({ brands })
    const router = useRouter();
    const name = router.query.name;

    const getBrands = async () => {
        try {
            const res = await sendHttpRequest(
                "get",
                `/CRUD/brands`,
                {
                    where: { is_deleted: false, is_active: true, is_upcoming_brand: false },
                },
                {},
                true
            );
            const newData = await Promise.all(res?.data?.result.map(async (each) => ({
                ...each,
                total: await getBrandTotalData(each.id)
            })));
            setBrands(newData);
        } catch (e) {
            console.log(e)
        }
    }

    const getUpcomingBrands = async () => {
        try {
            const res = await sendHttpRequest(
                "get",
                `/CRUD/brands`,
                {
                    where: { is_deleted: false, is_upcoming_brand: true },
                },
                {},
                true
            );
            const newData = await Promise.all(res?.data?.result.map(async (each) => ({
                ...each,
                total: await getBrandTotalData(each.id)
            })));
            setUpcomingBrands(newData);

        } catch (e) {
            console.log(e)
        }
    }

    const getBrandTotalData = async (id) => {
        const res = await sendHttpRequest(
            "get",
            `/CRUD/products`,
            {
                relations: ["brands"],
                where: {
                    brands: { id }
                }
            }, {}, true
        );
        return res?.data?.result?.length ?? 0;
    }

    useEffect(() => {
        getBrands();
        getUpcomingBrands();
        getBrandTotalData();
    }, [])

    return (

        <>


            <section >
                <Card className="brand_banner opacity-100">
                    <Card.Img src="/images/brand_banner_img.jpg" alt="Card image" />
                    <Card.ImgOverlay className='ms-5 '>
                        <h6 className='mt-5 heading_brand' style={{ fontSize: "64px", color: "#F6FBFF"}}>Explore Your Dream <br />
                            Home Designed by <br />
                            Brands</h6>
                    </Card.ImgOverlay>
                </Card>
                {/* <div>
                <h6 className='mt-5 heading_brand' style={{ fontSize: "64px", color: "#F6FBFF"}}>Explore Your Dream <br />
                            Home Designed by <br />
                            Brands</h6>
                </div> */}
            </section>

            <section className=''>
                <Container >
                    <Row>
                        <h1 className='mt-4 '>Brands Available</h1>
                        <p className='text-black'>Discover, Select a brand, explore products, and begin your journey toward your dream home.</p>
                        <div className='d-flex row '>
                            {!!brands?.length && brands?.map(({ brand_image, id, name, total }, idx) => (
                                <div className='col-md-3 ' key={idx}>
                                      <Link href={`/contentpage?id=${id}&brandName=${name}`} className="text-decoration-none">
                                    <div className="card brandscard text-center my-3 gx-" >
                                        <div className='d-flex justify-content-center brandimg'>
                                        <Image
                                            src={`${NEXT_PUBLIC_APP_ASSET_URL}${brand_image}`}
                                            alt=""
                                            style={{ height: "100px", width: "170px" }}
                                        />
                                        </div>
                                        
                                      
                                            <div className="card-body">
                                                <h5 className="card-title brandshead">{name}</h5>
                                                <p className='brand_data mb-1'>{total} Products</p>
                                            </div>
                                       
                                    </div>
                                    </Link>

                                </div>
                            ))
                            }
                        </div>

                    </Row>

                    <Row className='mt-3'>
                        <div>
                            <h1>Upcoming Brands</h1>
                            <p className='brand_data'>We are also onboarding these brands soon.</p>
                        </div>
                        <div className='d-flex row'>
                            {!!upcomingBrands?.length && upcomingBrands?.map(({ brand_image, id, name, total }, idx) => (
                                <div className=' col-md-3' key={idx}>
                                    <div className="card brandscard text-center my-3" style={{ borderRadius: "11px" }}>
                                        <div className='d-flex justify-content-center brandimg'>
                                            <Image
                                                src={`${NEXT_PUBLIC_APP_ASSET_URL}${brand_image}`}
                                                alt=""
                                                style={{ height: "100px", width: "170px" }}
                                            />
                                        </div>
                                        <Link href={`/contentpage?id=${id}&brandName=${name}`} className="text-decoration-none">
                                            <div className="card-body">
                                                <h5 className="card-title brandshead">{name}</h5>
                                                <p className='brand_data mb-1'>{total} Products</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        <div>

                        </div>
                    </Row>

                </Container>
            </section>



        </>

    )
}

export default Brand
