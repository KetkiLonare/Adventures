import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCards from "../ProductCards/ProductCards";
import PrevArrow from "../SliderArrows/PrevArrow";
import NextArrow from "../SliderArrows/NextArrow";
import { Col, Row } from "react-bootstrap";
import ProductCardLoader from "../LoadingComponent/productCardLoader";
import sendHttpRequest from "../../src/http/Request";

const ProductSliderCategory = ({ catid }) => {
  const [productdata, setproductdata] = useState();

  const getdata = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/products`,
        {
          relations: ["product_assets", "categories","sub_categories"],
          where: {
            is_deleted: false,
            is_active: true,
            categories: { id: catid },
          },
        },
        {},
        true
      );
      setproductdata(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const settings = {
    arrows: true,
    infinite: false,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    catid && getdata();
  }, [catid]);
  return (
    <>
      <div className="productsCorousel">
        <Row>
          <Col>
            <Slider {...settings}>
              {!!productdata?.length
                ? productdata?.length &&
                  productdata?.map((each, idx) => (
                    <div key={idx}>
                      <ProductCards
                        cardimg={each?.product_assets}
                        virtualvideos={each?.virtualvideos}
                        name={each?.name}
                        category_name={each?.categories?.name}
                        square_feet={each?.square_feet}
                        no_of_bedrooms={each?.no_of_bedrooms}
                        no_of_bathrooms={each?.no_of_bathrooms}
                        id={each.id}
                        style={each?.sub_categories?.name}
                      />
                    </div>
                  ))
                : [1, 2, 3, 4, 5, 6].map((idx) => (
                    <div key={idx}>
                      <ProductCardLoader />
                    </div>
                  ))}
            </Slider>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductSliderCategory;
