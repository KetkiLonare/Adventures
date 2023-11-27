import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import sendHttpRequest from "@/src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const News = () => {
  const [news, setNews] = useState([]);

  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/newposts", {
      //   params: { relations: ["tags"], where: { is_deleted: false ,is_active:true} },
      // });
      const res = await sendHttpRequest("get", `/CRUD/newposts`, { relations: ["tags"], where: { is_deleted: false, is_active: true } },{},true)
      setNews(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Create an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <div className="bg-color-primary pt-3">
        <Container className="newsContainer">
          <BreadcrumbNav />
          <h1 className="FW-extrabold FS-28">News</h1>
          <p className="FW-regular mt-2">
            Stay up to date with our latest news
          </p>
          <Row>
            {!!news?.length &&
              news.map((each, idx) => {
                const formattedDate = formatDate(each.published_date);
                return (
                  <Col className="flex justify-center mb-5" md={6} key={idx}>
                    <Link href={`/newsDetail?id=${each?.id}`} className="w-100">
                      <Card className="borderRadius-10 w-100 border-none boxShadowQuaterly">
                        <div className="newsImageDiv">
                          <Card.Img
                            variant="top"
                            src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.news_image}`}
                            alt="Home1"
                            onError={(e) => {
                              e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                            }}
                          />
                        </div>
                        <Card.Body className="px-9">
                          <span className="FW-medium mb-1 d-block">
                            {" "}
                            Published By : {each?.name} <span className="mx-1">|</span> {formattedDate} <span className="mx-1">|</span> {" "}
                            {each?.tags?.name}
                          </span>
                          <p className="fw-bold mb-0">{each?.heading}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default News;
