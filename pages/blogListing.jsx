import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import Link from "next/link";
import { Button, Form, Image } from "react-bootstrap";
import sendHttpRequest from "@/src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const BlogListing = () => {
  const [blog, setBlogs] = useState();
  const [news, setNews] = useState();
  const [category, setCategory] = useState();
  const [searchQuery, setSearchQuery] = useState({});


  const getData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/blogs`,
        {
          where: { is_deleted: false, is_active: true },
          filter: searchQuery?.searchfield != "" ? searchQuery : "",
        },
        {},
        true
      );
      setBlogs(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLatestData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/newposts`,
        {
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );

      const CategoryRes = await sendHttpRequest(
        "get",
        `/CRUD/categories`,
        {
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setNews(res.data.result);
      setCategory(CategoryRes.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    getLatestData();
  }, []);

  useEffect(() => {
    searchQuery?.searchfield === "" && getData();
  }, [searchQuery]);


  return (
    <>
      <div className="bg-color-primary">
        <Container className="blogListingContainer pt-3">
          <BreadcrumbNav />

          <Row>
            <h1 className="FW-extrabold FS-28">Blogs</h1>
            <p className="FW-regular mt-2">
              Stay up to date with our latest articles
            </p>
          </Row>
          <Row>
            <Col className="col-md-7">
              {!!blog &&
                blog?.map((each, idx) => (
                  <div key={idx}>
                    <Link href={`/blogDetail?id=${each?.id}`}>
                      <div className="card mb-4 borderRadius-12 border-none boxShadowQuaterly">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <div className="blogListingImg">
                              <Image
                                src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.blog_image}`}
                                alt="First image"
                                onError={(e) => {
                                  e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body p-4">
                              <span className="FS-13 FW-regular cardText-1">
                                {each?.tag}
                              </span>
                              <p className="FS-18 FW-bold my-2.5 text-black text-justify">
                                {each?.title}
                              </p>
                              <span className="FW-regular cardText-2 text-justify">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: each?.description,
                                  }}
                                />
                              </span>
                              {/* <h5 className="card-title">Card title</h5>
                          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </Col>
            <Col md={5}>
              {/* <Card className="cards_location-search border-0 rounded-0 ">
                <Card.Body>
                  <Form>
                    <Form.Group className="1">
                      <Form.Control
                        type="text"
                        className="py-2 m-2"
                        name="query"
                        placeholder="Search Keywords For Position"
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card> */}
              <div className="py-3 px-4 bg-white boxShadowQuaterly borderRadius-5 mb-5">
                <div className="inputGroup py-2 px-3 flex items-center borderRadius-5">
                  <i className="icon-search mr-3"></i>
                  {/* <input type="text" placeholder='What are you looking for?' /> */}
                  <Form.Control
                    type="text"
                    className="border-none shadow-none"
                    name="query"
                    value={searchQuery?.searchfield}
                    onChange={(e) => setSearchQuery((pre) => ({ ...pre, searchfield: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.key.trim() !== "") {
                        getData()}}}
                    placeholder="What are you looking for?"
                  />
                </div>
                {/* <Button
                className="btn border-0 cst1-primary btn-sm"
                type="submit"
                onClick={()=>getData()}>
                  Search
              </Button>
              <Button
                className="btn btn-secondary btn-sm ms-2"
                onClick={()=>setSearchQuery({searchfield:""})}>
                Reset
              </Button> */}
              </div>
              <div className="p-4 bg-white boxShadowQuaterly borderRadius-5  my-5 leading-4 categoriesPostDiv">
                <p className="FW-bold text-black">Categories</p>
                <div
                  className="categoryContainer"
                  style={{ maxHeight: "200px", overflow: "auto" }}
                >
                  {category?.length &&
                    category?.map((item, idx) => (
                      <div key={idx}>
                        <p className="block FS-6">{item?.name}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="p-4 bg-white boxShadowQuaterly borderRadius-5 my-5 leading-4 blogPostDiv">
                <p className="FW-bold text-black">Latest Post</p>
                <div className="card border-none">
                  {!!news?.length &&
                    news?.map((each, idx) => (
                      // <div className="row">
                      <Link
                        href={`/newsDetail?id=${each?.id}`}
                        className="row mb-3"
                        key={idx}
                      >
                        <div className="col-md-4 flex items-center">
                          <div className="blogPostImgDiv">
                            <Image
                              src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.news_image}`}
                              alt="First image"
                              className="borderRadius-10"
                              onError={(e) => {
                                e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body ps-0 leading-5">
                            <p className="FS-14 FW-semibold mb-2">
                              {each?.heading}
                            </p>
                            <span className="FS-14 FW-regular">
                              {each?.published_date}
                            </span>
                          </div>
                        </div>
                      </Link>
                      // </div>
                    ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BlogListing;
