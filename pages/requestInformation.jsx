import React, { useEffect, useRef, useState } from "react";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import CategoryTitleBox from "@/components/CategoryTitleBox/CategoryTitleBox";
import QuoteForm from "@/components/Quote";
import axios from "axios";
import { useRouter } from "next/router";
import { Carousel, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import ThumbnailCarousel from "@/components/ThumbnailCarousel/thumbnailCarousel";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import sendHttpRequest from "@/src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import ProductSliderCategory from "@/components/ProductSlider/ProductSliderCategory";
import ReactPlayer from 'react-player'


const RequestInformation = () => {
  const [productdata, setproductdata] = useState([]);
  const [isLoading, setLoading] = useState(false);



  const router = useRouter();
  const productid = router.query.id;


  const getdata = async () => {
    try {
      setLoading(true)
      const res = await sendHttpRequest("get", `/CRUD/products/${productid}`, { relations: ["product_assets", "categories", "sub_categories"], where: { is_deleted: false, is_active: true, product_assets: { is_deleted: false } } }, {})
      setproductdata(res?.data?.result);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)

    }
  };

  const galleryImages = productdata?.product_assets?.filter(each => each.type == "gallery_image" && each.is_deleted == false);

  const filteredfloorplan = productdata?.product_assets?.filter(each => each.type == "floor_image" && each.is_deleted === false);

  const singleLarge = productdata?.product_assets?.find(each => each.type == "Single_large")
  const Single_small1 = productdata?.product_assets?.find(each => each.type == "Single_small1")
  const Single_small2 = productdata?.product_assets?.find(each => each.type == "Single_small2")
  const Single_small3 = productdata?.product_assets?.find(each => each.type == "Single_small3")
  const Single_small4 = productdata?.product_assets?.find(each => each.type == "Single_small4")



  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    productid && getdata();
  }, [productid]);


  return (
    <>
      <div className="reqInfoContainer pt-4">
        <div className="container">
          <BreadcrumbNav page={productdata?.name} />

          <CategoryTitleBox
            quote={handleClick}
            name={productdata?.name}
            brochure={productdata?.brochure}
            category_name={productdata?.categories?.name}
            style_name={productdata?.sub_categories?.name}
            square_feet={productdata?.square_feet}
            no_of_bedrooms={productdata?.no_of_bedrooms}
            no_of_bathrooms={productdata?.no_of_bathrooms}
            ameneties={productdata?.ameneties}
            kitchen={productdata?.kitchen}
            dimensions={productdata?.dimensions}
            id={productdata?.id}
          />
          {singleLarge ?
            <div className="grid grid-rows-6 grid-cols-6 gap-4 relative productGalleryPrev">
              {singleLarge && Single_small1 && Single_small2 && Single_small3 && Single_small4 ?
                <>
                  <div className="row-span-6 md:col-span-4 col-span-6 relative gridLargeImg" >
                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${singleLarge?.image_file}`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                      style={{ 'borderRadius': '20px 0 0 20px' }}
                    />
                  </div>

                  <div className="row-span-3 col-span-1 d-none d-md-block gridSmallImg">

                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${Single_small1?.image_file}`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />
                    {/* <div className="h-100 boxShadow">
                          <SpinnerCicle />
                      </div> */}
                  </div>
                  <div className="row-span-3 col-span-1 d-none d-md-block gridSmallImg" >

                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${Single_small2?.image_file}`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />
                  </div>
                  <div className="row-span-3 col-span-1 d-none d-md-block gridSmallImg">

                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${Single_small3?.image_file}`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />

                  </div>
                  <div className="row-span-3 col-span-1 d-none d-md-block gridSmallImg">

                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${Single_small4?.image_file}`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />
                    {/* <div className="h-100 boxShadow">
                                      <SpinnerCicle />
                                  </div> */}
                  </div>
                </>
                : <div className="row-span-6 col-span-6 borderRadius-20 relative gridLargeImg">

                  <Image
                    className="borderRadius-20"
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${singleLarge?.image_file}`}
                    alt=""
                    onError={(e) => {
                      e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                    }}
                  />
                </div>}
              {!!galleryImages?.length && (
                <>
                  <span
                    className="absolute right-6 bottom-3 bg-white p-2 cursor-pointer rounded FW-bold boxShadowTertiary allPhotos"
                    onClick={handleShow}
                  >
                    {` See all ${galleryImages?.length} photos`}
                  </span>
                  <Modal
                    show={show}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="thumbnailModal"
                    fullscreen={true}
                  >
                    <Modal.Header className="justify-end border-none">
                      <button className="icon-cross text-white" onClick={handleClose}></button>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                      <ThumbnailCarousel galleryImages={galleryImages} />
                    </Modal.Body>
                  </Modal>
                </>
              )
              }
            </div> :

            <div className="grid grid-rows-6 grid-cols-6 gap-4 relative productGalleryPrev">
              <div className="row-span-6 col-span-4 relative gridLargeImg boxShadow">
                <div className="flex justify-center items-center absolute w-100 h-100">
                  {isLoading ? <Spinner animation="border" variant="dark" /> :
                    <Image src="/images/Latest_news.png" />
                  }
                </div>
              </div>
              {Array(4).fill()?.map((_, i) => (
                <div key={i} className="row-span-3 col-span-1 gridSmallImg relative boxShadow">
                  <div className="flex justify-center items-center absolute w-100 h-100">
                    {isLoading ? <Spinner animation="border" variant="dark" /> :
                      <Image src="/images/Latest_news.png" />}
                  </div>
                </div>
              ))}
            </div>

          }


          <div className="grid gap-4 my-4 planTourQuoteDetail">
            <div className="bg-white p-8 boxShadow floorPlanDiv" style={{ 'grid-row-end': (productdata?.virtualvideos || productdata?.virtualvideosupload) ? '2' : '3' }}>
              {console.log(productdata, "@@@@@@@@@productdata")}
              <h5 className="FW-bold">Floor Plan</h5>

              {!!filteredfloorplan?.length ?
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                  {filteredfloorplan?.map((each, idx) => {
                    if (each.type == "floor_image") {
                      return (

                        <SwiperSlide key={idx} >
                          <div className="floorPlanImgDiv">
                            <Image
                              src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.image_file}`}
                              alt=""
                              onError={(e) => {
                                e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                              }}
                            />
                          </div>
                        </SwiperSlide>

                      );
                    }
                  })}
                </Swiper> :
                (isLoading ? <Spinner animation="border" variant="dark" className="" /> :
                  <div className="floorPlanImgDiv w-100">
                    <Image src="/images/Latest_news.png" />
                  </div>)

              }
            </div>
            <div ref={ref} className="getQuoteDiv" >
              <QuoteForm productid={productid} />
            </div>

            {(productdata?.virtualvideos || productdata?.virtualvideosupload) && <div className="bg-white p-8 boxShadow virtualTourDiv">
              <h5 className="FW-bold">Video</h5>

              <div className="virtualTourImgDiv">{
                productdata?.virtualvideos ?
                  <iframe
                    src={productdata?.virtualvideos} Personal info
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe> :
                  <ReactPlayer url={`${NEXT_PUBLIC_APP_ASSET_URL}${productdata?.virtualvideosupload}`} controls={true} />}
              </div>
            </div>}
            {/* <div className="bg-white p-8 boxShadow virtualTourDiv">
              <h5 className="FW-bold">Virtual Tour</h5>

              <div className="virtualTourImgDiv">
                <iframe
                  src="https://www.youtube.com/watch?v=Q-lvt_OlXEQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div> */}
          </div>
        </div>

        <div className="container-fluid bg-white boxShadow pt-4 pb-5 similarHomeDiv">
          <div className="container">
            <h3 className="FW-extrabold">Similar Home Designs</h3>
            <p className="FW-medium">
              Explore more home designs similar to your search options
            </p>
            <ProductSliderCategory catid={productdata?.categories?.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestInformation;
