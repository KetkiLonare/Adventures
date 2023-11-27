import React, { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Skeleton } from "@/components/Loader/skeleton";
import sendHttpRequest from "../../src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const PartnersAssociation = () => {
  const [partners, setPartners] = useState([]);

  const partnersData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/partners", {
      //   params: { where: { is_deleted: false ,is_active:true} },
      // });

      const res = await sendHttpRequest(
        "get",
        `/CRUD/partners`,
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      setPartners(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    partnersData();
  }, []);
  return (
    <>
      <section className="partnerSection py-10 px-3 px-sm-0">
        <h3 className="text-center FW-bold text-black">
          Partnerships & Associations
        </h3>
        <p className="text-center pt-2 pb-4 FW-medium">
          Trusted association with industries best manufactures and financing
          institution
        </p>
        <Container>
          <Row>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
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
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                // When window width is >= 1024px
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
            >
              {!!partners?.length
                ? !!partners?.length &&
                  partners?.map((each, idx) => (
                    <SwiperSlide className="bg-transparent" key={idx}>
                      <div className="partnerImgDiv">
                        {!!each?.partners_image ? (
                          <Image
                            src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.partners_image}`}
                            alt=""
                            onError={(e) => {
                              e.target.src = "/images/watermark.jpg"; // Fallback to default image on error
                            }}
                          />
                        ) : (
                          <Skeleton height="100%" />
                        )}
                      </div>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 5, 6].map((idx) => (
                    <SwiperSlide
                      className="flex justify-center items-center bg-transparent"
                      key={idx}
                    >
                      <div className="partnerImgDiv">
                        <Skeleton height="100%" />
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PartnersAssociation;
