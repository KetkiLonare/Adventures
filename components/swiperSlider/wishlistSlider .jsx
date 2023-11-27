import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import ProductCards from "../ProductCards/ProductCards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useAppContext } from "@/src/hooks/UserContext";
import sendHttpRequest from "../../src/http/Request";

const WishlistSlider = () => {
  const { state, dispatch } = useAppContext();
  const user = state.userdata;

  const [wishlist, setWishlist] = useState();

  const getwishlistdata = async () => {
    try {
      const res = await sendHttpRequest("get", `/authroute/wishlists`, {
        relations: [
          "products",
          "products.product_assets",
          "products.categories",
        ],
        where: { users: { id: user?.id }, is_deleted: false },
      });
      setWishlist(res?.data?.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getwishlistdata();
  }, [user]);

  useMemo(() => {
    getwishlistdata();
  }, [state.wishlist]);

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
        breakpoints={{
          // When window width is >= 640px
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // When window width is >= 1024px
          // 1024: {
          //   slidesPerView: 4,
          //   spaceBetween: 30,
          // }
        }}
      >
        {!!wishlist?.length &&
          wishlist.map((each, idx) => (
            <SwiperSlide key={idx}>
              <ProductCards
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

export default WishlistSlider;
