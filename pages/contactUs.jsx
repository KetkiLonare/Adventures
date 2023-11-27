import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import Slider from "react-slick";
import useForm from "../src/hooks/useForm";
import { toast } from "react-toastify";
import PartnersAssociation from "@/components/PartnershipSection/partnersAssociation";
import sendHttpRequest from "@/src/http/Request";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import { validateContact } from "@/src/validate/validateContact";
import { useAppContext } from "@/src/hooks/UserContext";

const ContactUs = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
    ]
  };
  const { state, dispatch } = useAppContext();
  const [testimonial, setTestimonial] = useState();
  const [theme, setTheme] = useState();

  const [formobj, setformObj] = useState({
    fullName: "",
    email: "",
    sub_email: "",
    sub_name: "",
    mobile_no: "",
    description: "",
  });

  const [contactus, setContactUs] = useState();
  const [val, setVal] = useState();
  const [subVal, setSubVal] = useState();
  const [subErrors, setSuberrors] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/testimonials", {
      //   params: {
      //     where: { is_deleted: false, is_active: true },
      //   },
      // });
      const res = await sendHttpRequest(
        "get",
        `/CRUD/testimonials`,
        {
          where: { is_deleted: false, is_active: true },
        },
        {},
        true
      );
      setTestimonial(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const httpPost = async () => {
    if (
      !values.fullName ||
      !values.email ||
      !values.mobile_no ||
      !values.description
    ) {
      setVal("Please fill out all the fields");
      setTimeout(() => {
        setVal("");
      }, 10000);
      setSuccess("");
      return;
    }
    try {

      const res = await sendHttpRequest("post", `/sub/contact_us`, {}, values);
      setContactUs(res);

      dispatch({ type: "formSubmission", payload: true });

      // setSuccess("Form Submitted successfully");
      // setTimeout(() => {
      //   setSuccess('');
      // }, 3000);
      // setVal('')
      setValues({ fullName: "", email: "", description: "", mobile_no: "" });
    } catch (e) {
      toast.error("Failed to create data"); // Display error toast
      setSuccess("");
    }
  };

  const httpSubPost = async (userSubType) => {
    if (!subVal?.sub_email && !subVal?.sub_name)
      return setSuberrors({
        ...subErrors,
        sub_email: "email is requied",
        sub_name: "Name is requied",
      });
    if (!subVal?.sub_name)
      return setSuberrors({ ...subErrors, sub_name: "Name is requied" });
    if (!subVal?.sub_email)
      return setSuberrors({ ...subErrors, sub_email: "email is requied" });

    // Email domain validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(subVal.sub_email)) {
      return setSuberrors({
        sub_email: "Invalid email address",
      });
    }
    try {
      const partnersData = {
        sub_email: subVal.sub_email,
        sub_name: subVal.sub_name,
        users_sub_type: userSubType, // Set user_sub_type dynamically
      };

      const res = await sendHttpRequest(
        "post",
        `/sub/subscriber`,
        {},
        partnersData
      );
      if (res?.status == 201) {
        dispatch({ type: "formSubmission", payload: true });
      }
      if (res?.response?.status == 400) {
        setError(res?.response?.data?.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      setSubVal({ sub_name: "", sub_email: "" });
    } catch (e) {
      // Display error toast
    }
  };

  const {
    values,
    handleSubmit,
    setErrors,
    setIsSubmitting,
    errors,
    handleChange,
    setValues,
  } = useForm(httpPost, validateContact, formobj);

  const handleChange2 = (event) => {
    const { name, value, checked, type } = event.target;
    setSuberrors({ ...errors, [name]: null });
    let updateKeyPair = { [name]: value };
    if (type == "checkbox") {
      updateKeyPair[name] = checked;
    }
    setSubVal({
      ...subVal,
      ...updateKeyPair,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getTheme = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/themes_settings");
      const res = await sendHttpRequest(
        "get",
        `/CRUD/themes_settings`,
        {},
        {},
        true
      );
      // if(res?.status == 200){
      //   dispatch({ type: "formSubmission", payload: true });

      // }
      setTheme(res?.data?.result);
    } catch (error) {
      console.log("fetching error ", error);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);


  return (
    <div>
      <Container fluid className="g-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2966.3318554273988!2d-73.6574173243276!3d41.97168425955031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDU4JzE4LjEiTiA3M8KwMzknMTcuNCJX!5e0!3m2!1sen!2sin!4v1690796675967!5m2!1sen!2sin"
          width="100%"
          height="215"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.3359395812217!2d-73.65774992432753!3d41.97159655955581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd7741d2653723%3A0xaeeffc5a94b76a41!2sApex%20Modular%20Solutions!5e0!3m2!1sen!2sin!4v1690025564325!5m2!1sen!2sin" width="100%" height="215" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
      </Container>

      <Container>
        <Row className="py-16 justify-evenly">
          <Col className="inTouchWithUs col-lg-4 col-md-5 col-11">
            <h2 className="FW-extrabold">Get in Touch With Us</h2>
            <p className="FW-regular my-4">
              If you have any inquiries, feedback, our team is ready to assist
              you. Please fill out the form below, and we will get back to you
              promptly.
            </p>
            <Row className="getDirection p-6 boxShadowQuinary borderRadius-15">
              <Col className="flex items-center justify-center col-2">
                <i className="icon-location FS-32"></i>
              </Col>

              <Col>
                {theme?.length &&
                  theme?.map((each, idx) => (
                    <p className="FW-medium mb-2" key={idx}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: each?.company_address
                            ? each?.company_address
                            : "Apex Modular Solutions PO BOX 3072, Poughkeepsie NY 12603",
                        }}
                      />
                    </p>
                  ))}
                <Link href="#" className="FS-16 underline FW-medium">
                  Get Direction
                </Link>
              </Col>
            </Row>
            <Row className="getDirection p-6 boxShadowQuinary borderRadius-15 my-4">
              <Col className="flex items-center justify-center col-2">
                <i className="icon-email FS-20"></i>
              </Col>
              <Col>
                {/* <input type="email" name="info@apexmodulars.com" /> */}

                <Link href="mailto: info@apexmodulars.com">
                  {theme?.length &&
                    theme?.map((each, idx) => (
                      <p key={idx} className="mb-0 underline mailLink">
                        {" "}
                        {each?.email ? each?.email : "info@apexmodulars.com"}
                      </p>
                    ))}
                </Link>
              </Col>
            </Row>
            <Row className="getDirection p-6 boxShadowQuinary borderRadius-15">
              <Col className="flex items-center justify-center col-2">
                <i className="icon-contact-number FS-32"></i>
              </Col>
              <Col className="contactDetail d-flex align-items-center">
                {/* <p className='FW-medium'>Apex Modular Solutions PO BOX 3072, Poughkeepsie NY 12603</p>
                  <Link href="#" className='FS-16 underline FW-medium'>Get Direction</Link> */}
                <Link href="tel:845-393-1477">
                  {theme?.length &&
                    theme?.map((each, idx) => (
                      <p key={idx} className="mb-0">
                        {each?.contact_no1 ?? each?.contact_no1}
                      </p>
                    ))}
                </Link>{" "}
                <span className="FS-20 mx-2">|</span>{" "}
                <Link href="tel:866-APEX 777">
                  {theme?.length &&
                    theme?.map((each, idx) => (
                      <p key={idx} className="mb-0">
                        {each?.contact_no2 ?? each?.contact_no2}
                      </p>
                    ))}
                </Link>
              </Col>
            </Row>
          </Col>
          <Col
            className="py-4 px-4 mt-4 mt-md-0 text-white FS-14 FW-semibold contactUsForm borderRadius-10 col-lg-4 col-md-5 col-11"
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-4 shadow-none border-none"
              // controlId="email"
              >
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={values?.fullName ?? ""}
                  onChange={handleChange}
                  isInvalid={!!errors?.fullName}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 shadow-none border-none"
              // controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values?.email}
                  isInvalid={!!errors?.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 shadow-none border-none"
              // controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="mobile_no"
                  value={values?.mobile_no}
                  isInvalid={!!errors?.mobile_no}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-4  shadow-none border-none"
              // controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values?.description}
                  isInvalid={!!errors?.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" className="border-none FW-bold">
                Submit Details
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>



      {/* <section className='testimonialSlider'>
          <Container>
            <h2 className='FW-extrabold text-center'>Testimonials from Our Valued Collaborators</h2>
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              navigation={{
                clickable: true,
              }}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Mousewheel, Keyboard]}
              className="mySwiper py-3"
            >
              <SwiperSlide>
                <div className='boxShadowPrimary py-3 px-4 testimonialCard' key={idx}>
                  <Row>
                    <p ><div
                      dangerouslySetInnerHTML={{
                        __html: each?.descriptions,
                      }}
                    /></p>
                  </Row>
                  <Row className='items-center'>
                    <Col md={2}>
                      <div className='testimonialProfileImg'>
                        <Image src={`${NEXT_PUBLIC_APP_ASSET_URL}${each?.testimonial_image}`} />
                      </div>
                    </Col>
                    <Col className='text-left'>
                      <h5>{each?.name}</h5>
                      <p className='mb-0'>{each?.position}</p>
                    </Col>
                  </Row>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='boxShadowPrimary p-3 w-75'>
                  <Row>
                    <p className='text-justify'>We partnered with Apex Modular Solutions on a large-scale housing project, and the experience exceeded our expectations. Their expertise in modular construction and commitment to quality resulted in a seamless collaboration. We were impressed by their professionalism, attention to detail, and ability to deliver projects on time and within budget.</p>
                  </Row>
                  <Row className='items-center'>
                    <Col md={2}>
                      <div className='testimonialProfileImg'>
                        <Image  src="/images/testimonialProfilePic.png"/>
                      </div>
                    </Col>
                    <Col className='text-left'>
                      <h5>John Smith</h5>
                      <p className='mb-0'>CEO of ABC Construction Company.</p>
                    </Col>
                  </Row>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='boxShadowPrimary p-3 w-75'>
                  <Row>
                    <p className='text-justify'>We partnered with Apex Modular Solutions on a large-scale housing project, and the experience exceeded our expectations. Their expertise in modular construction and commitment to quality resulted in a seamless collaboration. We were impressed by their professionalism, attention to detail, and ability to deliver projects on time and within budget.</p>
                  </Row>
                  <Row className='items-center'>
                    <Col md={2}>
                      <div className='testimonialProfileImg'>
                        <Image  src="/images/testimonialProfilePic.png"/>
                      </div>
                    </Col>
                    <Col className='text-left'>
                      <h5>John Smith</h5>
                      <p className='mb-0'>CEO of ABC Construction Company.</p>
                    </Col>
                  </Row>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='boxShadowPrimary p-3 w-75'>
                  <Row>
                    <p className='text-justify'>We partnered with Apex Modular Solutions on a large-scale housing project, and the experience exceeded our expectations. Their expertise in modular construction and commitment to quality resulted in a seamless collaboration. We were impressed by their professionalism, attention to detail, and ability to deliver projects on time and within budget.</p>
                  </Row>
                  <Row className='items-center'>
                    <Col md={2}>
                      <div className='testimonialProfileImg'>
                        <Image  src="/images/testimonialProfilePic.png"/>
                      </div>
                    </Col>
                    <Col className='text-left'>
                      <h5>John Smith</h5>
                      <p className='mb-0'>CEO of ABC Construction Company.</p>
                    </Col>
                  </Row>
                </div>
              </SwiperSlide>
            </Swiper>
          </Container>
        </section> */}


    </div>
  );
};

export default ContactUs;
