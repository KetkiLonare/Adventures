import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import ProductCards from "../ProductCards/ProductCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { useAppContext } from "@/src/hooks/UserContext";
import sendHttpRequest from "../../src/http/Request";

const QuoteSlider = () => {
  const { state, dispatch } = useAppContext();
  const user = state.userdata;

  const [Quote, setQuote] = useState();

  const getQuotedata = async () => {
    try {
      // const res = await axios.get(`http://localhost:4000/CRUD/getquote`,{params:{relations:["products","products.product_assets","products.categories"],where:{users:{id:user?.id}, is_deleted: false } }} )
      const res = sendHttpRequest("get", `/authroute/getquote`, {
        relations: [
          "products",
          "products.product_assets",
          "products.categories",
        ],
        where: { users: { id: user?.id }, is_deleted: false },
      });
      setQuote(res?.data?.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuotedata();
  }, [user]);

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
        {!!Quote?.length &&
          Quote.map((each, idx) => (
            <SwiperSlide key={idx}>
              <ProductCards
                key={each.products?.id}
                cardimg={each?.products?.product_assets}
                name={each?.products?.name}
                category_name={each?.products?.categories?.name}
                square_feet={each?.products?.square_feet}
                no_of_bedrooms={each?.products?.no_of_bedrooms}
                no_of_bathrooms={each?.products?.no_of_bathrooms}
                id={each.products?.id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default QuoteSlider;
