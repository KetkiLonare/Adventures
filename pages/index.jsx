import React, { useEffect, useState } from "react";
import ProductSlider from "@/components/ProductSlider/ProductSlider";
import SearchField from "@/components/SearchField/SearchField";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Form, Image, Modal, Spinner } from "react-bootstrap";
import Link from "next/link";
import { Skeleton } from "@/components/Loader/skeleton";
import PartnersAssociation from "@/components/PartnershipSection/partnersAssociation";
import { useAppContext } from "../src/hooks/UserContext";
import useForm from "../src/hooks/useForm";
import { validateQuote } from "@/src/validate/validateQuote";
import sendHttpRequest from "@/src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [banner, setBanner] = useState([]);
  const [product, setProduct] = useState();
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [success, setSuccess] = useState("");
  const [nameerror, setName] = useState("");
  const [emailerror, setEmail] = useState("");
  const { state, dispatch } = useAppContext();

  const [formobj, setformObj] = useState({
    sub_name: "",
    sub_email: "",
  });

  const [searchFilter, setSearchFilter] = useState([
    { sqf: "", bedrooms: "", bathrooms: "", level: "" },
  ]);

  const getdata = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/banners`,
        {
          relations: ["products", "products.product_assets"],
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setSearchFilter();
      setBanner(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const prodData = async () => {
    try {
      const productRes = await sendHttpRequest(
        "get",
        `/CRUD/products`,
        {
          relations: ["categories"],
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setProduct(productRes.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    prodData();
  }, []);

  const newsData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/newposts`,
        { relations: ["tags"], where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      setNews(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    newsData();
  }, []);

  const recentData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/blogs`,
        { where: { is_deleted: false, is_active: true } },
        {},
        true
      );
      setRecent(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    recentData();
  }, []);

  const datanew = news?.map((each) => each?.tags?.name);
  const newsheading = news?.map((each) => each?.heading);
  const newsname = news?.map((each) => each?.name);

  const httpPost = async (userSubType) => {
    try {
      if (!values.sub_email && !values.sub_name.trim()) {
        setEmail("Please Provide Email ");
        setName("Please Provide Name");
        return;
      }
      if (!values.sub_email) {
        setEmail("Please Provide Email");
        setName("");
        return;
      }
      // Email domain validation
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(values.sub_email)) {
        return setEmail({
          sub_email: "Invalid email address",
        });
      }
      if (!values.sub_name) {
        setName("Please Provide Name");
        setEmail("");
        return;
      }

      const subscriptionData = {
        sub_email: values.sub_email,
        sub_name: values.sub_name,
        users_sub_type: userSubType, // Set user_sub_type dynamically
      };
      const res = await sendHttpRequest(
        "post",
        "/sub/subscriber",
        {},
        subscriptionData
      );
      if (res?.status == 201) {
        dispatch({ type: "formSubmission", payload: true });
      }
      setSuccess(res?.data?.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);

      if (res?.response?.status == 400) {
        setError(res?.response?.data?.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }

      if (res?.data) {
        setSubscribe(res?.data);
        setEmail("");
        setName("");
        setValues({ sub_name: "", sub_email: "" });
      }
    } catch (e) {
      const { response } = e;
      setError(response?.data?.message); // Display error toast
      setTimeout(() => {
        setError("");
      }, 1000);
      setSuccess("");
    }
  };

  const {
    values,
    handleSubmit,
    setErrors,
    setIsSubmitting,
    errors,
    setValues,
  } = useForm(httpPost, validateQuote, formobj);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    let updateKeyPair = { [name]: value };
    if (type == "checkbox") {
      updateKeyPair[name] = value;
    }
    setValues({
      ...values,
      ...updateKeyPair,
    });
  };

  return (
    <>
      {/* Banner Slider */}
      <section
        className={`container-fluid px-0 bnrCarousel bnrNextArrow${banner?.length} relative`}
      >
        <Carousel interval={null}>
          {!!banner?.length ? (
            !!banner?.length &&
            banner?.map((each, idx) => (
              <Carousel.Item key={idx}>
                {!!each.products?.product_assets.length &&
                  each.products.product_assets.map((item, idx) => {
                    if (item.type == "banner") {
                      return (
                        <Image
                          key={idx}
                          src={`${NEXT_PUBLIC_APP_ASSET_URL}${item?.image_file}`}
                          alt="First slide"
                          onError={(e) => {
                            e.target.src = "/images/banner_default.png"; // Fallback to default image on error
                          }}
                        />
                      );
                    }
                  })}
                <Carousel.Caption className="text-start px-3">
                  <h3 className="FW-extrabold">{each?.products?.name}</h3>
                  <p className="FW-regular my-1">
                    {`${each?.products?.square_feet} Square Feet, ${each?.products?.no_of_bedrooms} Bedrooms, ${each?.products?.no_of_bathrooms} Bathrooms, Ranch`}
                  </p>
                  <Link
                    href={`/requestInformation?id=${each?.products?.id}`}
                    className="underline"
                  >
                    View Details
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <div className="flex justify-center items-center absolute w-100 h-100">
                <Spinner animation="border" variant="dark" />
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </section>

      {/* Search Field Section */}


      {/* Crafting Section */}
      <Container className="my-10 craftingSection">
        <Row className="md:justify-between">
          <Col md={6} className="flex justify-center md:justify-start">
            <div className="leftImage">
              <Image src="/images/left-image.png" alt="" />
            </div>
          </Col>
          <Col className="pt-2 text-justify  px-sm-0 px-5" md={6}>
            <h3 className="FW-extrabold">Crafting Your Dream Home</h3>
            <p className="mt-4">
              Apex Modular Solutions is dedicated to making affordable housing
              available to more people than ever before. With our innovative and
              revolutionary approach to creating tiny homes and apartment
              complexes, our modular solutions allow for quick and cost
              efficient construction with minimal disruption to existing
              structures.
            </p>
            <p>
              We offer high quality homes with competitive pricing. You can
              design your fully customized tiny home with all the amenities you
              dream of. Our online showroom and user friendly design features
              make it simple to explore a wide selection of floor models and
              choose the features you want to fit your lifestyle and budget
              needs.
            </p>
            <p>
              Live a luxurious, sustainable lifestyle with our tiny homes all
              while reducing your environmental footprint.
            </p>
            <Link href="/WhyApexModule">
              <Button className="button1 mr-2 FW-bold py-2.5">Read More</Button>
            </Link>

            <Button
              className="button2 ml-2 FW-bold inline-flex items-center"
              onClick={handleShow}
            >
              <i className="icon-video text-2xl mr-2"></i>
              <span className="FS-16">Watch Video</span>
            </Button>
            {/* <Modal show={show} onHide={handleClose} centered>
              <Modal.Body className="p-0">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/watch?v=MwdAm6cUeWM" // Replace with your YouTube video ID
                  title="Video Player"
                  allowFullScreen
                ></iframe>
              </Modal.Body>
            </Modal> */}
          </Col>
        </Row>
      </Container>

      {/* Planning Section */}
      <section className="planningSection">
        <Container className="planningContainer py-10">
          <Row>
            <Col
              md={4}
              className="flex items-center  md:justify-start justify-center"
            >
              <p className="mb-0 pr-2">
                <i className="icon-number FS-44"></i>
              </p>
              <h5 className="pl-2 FW-regular">
                MODULAR HOME DESIGN AND DEVELOPMENT
              </h5>
            </Col>
            <Col
              md={4}
              className="flex items-center md:justify-start justify-center"
            >
              <p className="mb-0 pr-2">
                <i className="icon-number1"></i>
              </p>
              <h5 className="pl-2 FW-regular">
                PLANNING AND BUILDING HOME STRUCTURE
              </h5>
            </Col>
            <Col
              md={4}
              className="flex items-center md:justify-start justify-center"
            >
              <p className="mb-0 pr-2">
                <i className="icon-number2"></i>
              </p>
              <h5 className="pl-2 FW-regular">
                OFF-SITE MODULAR BUILD CONCURRENT WITH ON SITE
              </h5>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Slider Sections */}
      <section className="container my-10 productSliderSection">
        <div>
          <h3 className="FW-extrabold">Most Searched Home Designs</h3>
          <p className="FW-medium">Popular home design loved by 1000+ buyers</p>
          <ProductSlider />
        </div>

        <div className="my-10">
          <h3 className="FW-extrabold">Apex Featured Home Designs</h3>
          <p className="FW-medium">
            Buy best affordable and budget friendly homes recommended by Apex
            Modular Solutions.
          </p>
          <ProductSlider />
        </div>

        <div className="mb-10">
          <h3 className="FW-extrabold">Budget Friendly Home Designs</h3>
          <p className="FW-medium">
            Buy best affordable and budget friendly homes recommended by Apex
            Modular Solutions.
          </p>
          <ProductSlider />
        </div>
      </section>

      {/* Partnership Section */}
      <PartnersAssociation />

      {/* News & Post Section */}
      <Container className="newsPostSection my-12">
        <Row className=" px-sm-0 px-4">
          <Col className="col-lg-6 col-sm-10 col-12 mx-lg-0 mx-auto d-lg-block d-flex flex-column">
            <div className="flex justify-between items-center mb-2 pe-lg-4 pe-0">
              <h3 className="FW-bold">Latest News</h3>
              <Link href="/news" className="underline FS-14 viewAllBtn">
                View All
              </Link>
            </div>

            <div className="card border-0 flex items-center lg:items-start newsCard align-self-center">
              <Link href="/news" className="underline FS-14 viewAllBtn">
                <div className="newsImgDiv">
                  {!!news?.length && !!news[news?.length - 1]?.news_image ? (
                    <Image
                      src={`${NEXT_PUBLIC_APP_ASSET_URL}${news[news?.length - 1]?.news_image
                        }`}
                      alt=""
                      onError={(e) => {
                        e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                      }}
                    />
                  ) : (
                    <Skeleton height="100%" />
                  )}
                </div>

                <div className="card-img-overlay">
                  <span className="blueFlag FW-medium py-1 px-2">
                    {!!datanew?.length && datanew[0]
                      ? !!datanew?.length && datanew[0]
                      : ""}
                  </span>
                  {/* <p className="FW-bold FS-18 my-2 text-white">
              Parts of iconic Tappan Zee Bridge recycled into parts of
              tiny houses
            </p> */}
                  <span className="block FW-medium text-white">
                    {!!newsheading?.length && newsheading[0]
                      ? !!newsheading?.length && newsheading[0]
                      : ""}
                  </span>
                  <span className="FW-medium text-white">
                    By:{" "}
                    {!!newsname?.length && newsname[0]
                      ? !!newsname?.length && newsname[0]
                      : "NA"}
                  </span>
                </div>
              </Link>
            </div>
          </Col>
          <Col className="col-lg-6 col-sm-10 col-12 mx-lg-0 mx-auto mt-lg-0 mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="FW-bold">Recent Post</h3>
              <Link href="/blogListing" className="underline FS-14 viewAllBtn">
                View All
              </Link>
            </div>
            <div className="card h-fit border-0">
              <div className="row g-0">
                <div className="col-sm-4 d-sm-block d-flex justify-content-lg-start justify-content-center">
                  <div className="featuredImgDiv">
                    {!!recent?.length &&
                      !!recent[recent?.length - 1]?.blog_image ? (
                      <Image
                        src={`${NEXT_PUBLIC_APP_ASSET_URL}${recent[recent?.length - 1]?.blog_image
                          }`}
                        alt="..."
                        onError={(e) => {
                          e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                        }}
                      />
                    ) : !!recent?.length ? (
                      <Image src="/images/home1.png" alt="..." />
                    ) : (
                      <Skeleton height="100%" />
                    )}
                  </div>
                </div>
                <div className="col-sm-8 text-sm-start text-center">
                  <div className="card-body py-0 mt-sm-0 mt-3">
                    <span className="blueFlag FW-medium py-1 px-2">
                      FEATURED HOMES
                    </span>
                    <p className="FW-bold FS-18 my-1.5">
                      {!!recent?.length ? (
                        recent[recent?.length - 1]?.title
                      ) : (
                        <Skeleton height={20} width="60%" />
                      )}
                    </p>
                    <span className="block my-1.5 blogText">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: !!recent?.length
                            ? recent[recent?.length - 1]?.description
                            : "",
                        }}
                      />
                    </span>
                    <Link
                      href={`/blogDetail?id=${!!recent?.length && recent[recent?.length - 1]?.id
                        }`}
                      className="underline FS-14 FW-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-3"></div>
            <div className="card h-fit border-0">
              <div className="row g-0">
                <div className="col-sm-4 d-sm-block d-flex justify-content-lg-start justify-content-center">
                  <div className="featuredImgDiv">
                    {!!recent?.length &&
                      !!recent[recent?.length - 2]?.blog_image ? (
                      <Image
                        src={`${NEXT_PUBLIC_APP_ASSET_URL}${recent[recent?.length - 2]?.blog_image
                          }`}
                        alt="..."
                        onError={(e) => {
                          e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                        }}
                      />
                    ) : (
                      <Skeleton height="100%" />
                    )}
                  </div>
                </div>
                <div className="col-sm-8 text-sm-start text-center">
                  <div className="card-body py-0 mt-sm-0 mt-3">
                    <span className="blueFlag FW-medium py-1 px-2">
                      FEATURED HOMES
                    </span>
                    <p className="FW-bold FS-18 my-1.5">
                      {!!recent?.length ? (
                        recent[recent?.length - 2]?.title
                      ) : (
                        <Skeleton height={20} width="60%" />
                      )}
                    </p>
                    <span className="block my-1.5 blogText">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: !!recent?.length
                            ? recent[recent?.length - 2]?.description
                            : "",
                        }}
                      />
                    </span>
                    <Link
                      href="/blogDetail"
                      className="underline FS-14 FW-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Subscribe Newsletter Section */}
      <section className="container mb-10 BG-gradient newsLetterSection">
        <Row className="px-4 py-10 items-center">
          <Col md={6}>
            <h5 className="FS-20 FW-bold text-md-start text-center">
              GET EVERY DAY NEWS UPDATES IN YOUR INBOX !
            </h5>
            <p className="FW-regular text-md-start text-center my-md-0 my-3">
              Subscribe to Our Newsletter
            </p>
          </Col>
          <Col md={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                httpPost("subscriber"); // Set user_sub_type to 'partner'
              }}
              className="row"
            >
              <Form.Group
                className="col-lg-5"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  name="sub_name"
                  value={values?.sub_name}
                  onChange={handleChange}
                  isInvalid={nameerror ?? nameerror}
                  placeholder="Name"
                  className="p-2 rounded-md border-none shadow-none"
                />
                {/* {nameerror ?? <span>{nameerror}</span>} */}
              </Form.Group>

              <Form.Group
                className="col-lg-5 my-3 my-lg-0"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="email"
                  name="sub_email"
                  value={values?.sub_email}
                  onChange={handleChange}
                  isInvalid={emailerror ?? emailerror}
                  placeholder="Email"
                  className="p-2 rounded-md border-none shadow-none"
                />
                {/* {emailerror ?? <span>{emailerror}</span>} */}
              </Form.Group>
              <Button
                type="submit"
                className="FW-medium border-0 px-3 py-2 h-fit col-lg-2 col-4 mx-auto mx-lg-0"
              >
                Subscribe
              </Button>
              <p style={{ color: "red", marginLeft: "270px" }}>{error}</p>
              {/* <p className="ms-4" style={{ color: "green" }}>
                {success}
              </p> */}
            </Form>
          </Col>
        </Row>
      </section>
    </>
  );
}
