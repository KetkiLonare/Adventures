import React from "react";
import { useState } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import sendHttpRequest from "../../src/http/Request";

const SwiperSlider = () => {
  //   const ProductSlider = ({ slidesToShow = 4 }) => {
  const [productdata, setproductdata] = useState();

  const getdata = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/products", {
      //   params: { relations: ["product_assets"] , where: { is_deleted: false }},
      // });

      const res = await sendHttpRequest(
        "get",
        `/CRUD/products`,
        {
          relations: ["product_assets"],
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setproductdata(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* {productdata?.length && productdata.map((each, idx) => (
                    <SwiperSlide>
                        <ProductCards key={idx} cardimg={each?.image} virtualvideos={each?.virtualvideos} name={each?.name} category_name={each?.category_name} square_feet={each?.square_feet} no_of_bedrooms={each?.no_of_bedrooms} no_of_bathrooms={each?.no_of_bathrooms} id={each.id} />
                    </SwiperSlide>
                ))} */}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
