import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useAppContext } from "@/src/hooks/UserContext";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import { Badge, Button } from "react-bootstrap";

const ProductCards = ({
  cardimg = [],
  name,
  category_name,
  square_feet,
  no_of_bedrooms,
  no_of_bathrooms,
  id,
  style,
  manufactured_home,
  model_id
}) => {
  const { state, dispatch } = useAppContext();


  return (
    <>
      <Card className="w-fit cardBoxShadow border-0 mb-4">
        <Link href={`/requestInformation?id=${id}`} className="cardTopImgDiv">
          {!!cardimg.length ? (
            cardimg.map((item) => {
              if (item.type === "product_card") {
                return item?.image_file ? (
                  <Card.Img
                    variant="top"
                    src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file}`}
                    alt="Home1"
                    onError={(e) => {
                      e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                    }}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src="/images/Latest_news.png"
                    alt="Home1"
                  />
                );
              }
            })
          ) : (
            // <h5>image is here</h5>
            // <Card.Img variant="top" src="/images/home1.png" alt="Home1" />
            <Card.Img variant="top" src="/images/Latest_news.png" alt="Home1" />
          )}
        </Link>
        <Badge bg="dark" className="position-absolute">{manufactured_home == true ? "Manufactured " : ""}</Badge>
        <Card.Body>
          <Card.Title className="FW-semibold FS-16 text-uppercase">
            {name} {model_id ? model_id :""}
          </Card.Title>
          {/* <Skeleton width="60%" /> */}

          <Card.Text>
            <span className="d-block FS-12">Category: {category_name ? category_name : "NA"}</span>
            <span className="d-block FS-12 my-1">Style: {style ? style : "NA"}</span>
            {/* <span className="d-block FS-12">Model Id: {model_id ? model_id : "NA"}</span> */}
          </Card.Text>
          
          {/* <Card.Text className="FS-12 capitalize ">
            Category: {category_name ? category_name : "NA"}
            Style: {style ? style : "NA"}
            <Button style={{ fontSize: "10px", background: "#05294b", }}>{manufactured_home == true ? "Manufactured " : ""}</Button>
          </Card.Text> */}

        </Card.Body>
        <Card.Body className="px-0 py-0">
          <div className="row py-2 border-top border-bottom mx-0 w-full">
            <div
              className="col border-end d-flex justify-center items-center flex-col"
              title="Square feet"
            >
              <i className="icon-area FS-24"></i>
              {
                square_feet ? (
                  <span className="FW-bold">{square_feet}</span>
                ) : (
                  "---"
                )
                // <><div className="mt-px"></div>
                //   <Skeleton width="60%" /></>
              }
            </div>
            <div
              className="col border-end d-flex justify-center items-center flex-col"
              title="Bedrooms"
            >
              <i className="icon-bed FS-24"></i>
              {
                no_of_bedrooms ? (
                  <span className="FW-bold">{no_of_bedrooms}</span>
                ) : (
                  "---"
                )
                // <><div className="mt-px"></div>
                //   <Skeleton width="60%" /></>
              }
            </div>
            <div
              className="col d-flex justify-center items-center flex-col"
              title="Bathrooms"
            >
              <i className="icon-bath-tub FS-24"></i>
              {
                no_of_bathrooms ? (
                  <span className="FW-bold">{no_of_bathrooms}</span>
                ) : (
                  "---"
                )
                // <> <div className="mt-0.5"></div>
                //   <Skeleton width="60%" /></>
              }
            </div>
          </div>
        </Card.Body>
        <Card.Body className="d-flex justify-between py-3">
          <Card.Link
            className="text-decoration-none FS-14 FW-semibold"
            href={`/requestInformation?id=${id}`}
          >
            View Details
          </Card.Link>
          <div
            className="text-decoration-none FS-20"
            type="button"
            onClick={() =>
              state.logout === false
                ? dispatch({ type: "Wishlist", payload: id })
                : dispatch({ type: "togglelogin", payload: true })
            }
          >
            <i
              className="icon-like"
              style={{
                color: state?.wishlist?.includes(id) ? "#ac124a" : "#d6d6d6",
              }}
            ></i>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCards;
