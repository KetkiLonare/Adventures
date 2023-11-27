import sendHttpRequest from '@/src/http/Request';
import React, { useEffect, useState } from 'react'
// import styles from './testCarousel.module.css'
// import { Swiper, SwiperSlide } from 'swiper/react';
import Slider from "react-slick";

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/grid';
// import 'swiper/css/pagination';
// import { Grid, Pagination } from 'swiper';

const TestCarouselTest = () => {
  const [data, setData] = useState();
  console.log({ data })

  const getData = async () => {
    try {
      const res = await sendHttpRequest("get", `/CRUD/careers`, { where: { is_active: true, is_deleted: false } }, {}, true)
      setData(res?.data?.result,)
    } catch (error) {
      console.log("fetching error data", error)
    }
  }

  useEffect(() => {
    getData();
  }, [])





  const CustomPrevArrow = (props) => (
    <div className="custom-arrow custom-prev-arrow d-inline position-absolute right-14 -top-10" type="button" onClick={props.onClick}>
      <i className='icon-careerPrevArrow FS-24'></i>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div className="custom-arrow custom-next-arrow d-inline  position-absolute -top-10 right-4" type="button" onClick={props.onClick}>
      <i className='icon-careerNextArrow FS-24'></i>
    </div>
  );


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
      {/* <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="styles.sliderContainer"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
      <div >
        <Slider {...settings}>
          {data && data.map((job, index) => (
            <div key={index}>
              <div className="openPositionCard d-flex justify-content-center">
                <div className="positionProfile h-fit position-relative top-5 left-5 rounded-circle bg-white">
                  <i className={`icon-${job.icon} text-rose-500 FS-28`}></i>
                </div>
                <div className="positionDetail bg-white boxShadowQuinary d-flex flex-col justify-content-between">
                  <div>
                    <h5 className='FW-bold'>{job.job_title
                    }</h5>
                    <span
                          dangerouslySetInnerHTML={{
                            __html: job.job_description,
                          }}
                          className='FW-regular d-block my-2'
                        />
                  </div>
                  <div className="row">
                    <div className="col">
                    <span
                          dangerouslySetInnerHTML={{
                            __html: job.job_address,
                          }}
                          className='FW-regular d-block my-2'
                        />
                      <span className='d-block FW-medium'>{job.type_of_job}</span>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <button className='px-2 py-1 borderRadius-5 FS-12 FW-medium h-fit'>Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </div>
    </>
  )
}

export default TestCarouselTest