import React, { useState } from "react";
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import useForm from "@/src/hooks/useForm";
import { validateQuote } from "@/src/validate/validateQuote";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import TestCarouselTest from "@/components/TestCarousel/testCarousel";
import sendHttpRequest from "@/src/http/Request";

const Career = () => {
  const [formObj, setformObj] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    descriptions: "",
    apply_for: "",
    resume: "",
  });

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const httpPost = async () => {
    if (
      !values.first_name ||
      !values.last_name ||
      !values.email ||
      !values.mobile_no ||
      !values.descriptions ||
      !values.apply_for
    ) {
      setError("Please fill out all the fields");
      setTimeout(() => {
          setError('');
        }, 10000);
      return;
    }

    try {
      const resData = await sendHttpRequest(
        "post",
        `/authroute/applicationform`,
        {}, values
      );
      setValues({
        first_name: "",
        last_name: "",
        email: "",
        descriptions: "",
        mobile_no: "",
        apply_for: "",
        resume: '',
      });
      setSuccess("Application Form Submitted Successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setError("");
    } catch (error) {
      toast.error("data not save");
      console.log("fetching data error", error);
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
  } = useForm(httpPost, validateQuote, {...formObj});

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === "file") {
      const file = event.target.files[0];
      setValues({
        ...values,
        [name]: file,
      });
    } else {
      let updateKeyPair = { [name]: value };
      if (type == "checkbox") {
        updateKeyPair[name] = value;
      }
      setValues({
        ...values,
        ...updateKeyPair,
      });

    }

  };

  const handleChangeCareer = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <div className="flex justify-center items-center py-10 BG-gradient">
        <h1>Career</h1>
      </div>

      <Container className="joinOurTeam mt-5 mb-14">
        <Row>
          <Col md={7} className="flex flex-col justify-center order-md-1 order-2 mt-md-0 mt-4">
            <h2 className="FW-semibold text-center text-md-start">Join Our Team</h2>
            <span className="FW-medium block my-3 text-center text-md-start">
              Careers at Apex Modular Solutions
            </span>
            <p className="FW-medium text-justify text-md-start">
              At Apex Modular Solutions, we believe in building a talented and
              dedicated team that shares our vision of making affordable housing
              accessible to more people than ever before. If you are passionate
              about innovation, sustainability, and making a positive impact, we
              invite you to explore career opportunities with us. Join our team
              and contribute to the future of affordable housing. we invite you
              to submit your CV to the following email address.
            </p>
            <h3 className="FW-bold my-3 text-center text-md-start">info@apexmodulars.com</h3>
            <span>
              To apply, please attach your CV to an email, including a cover
              letter if desired. In the subject line, indicate the position or
              area of interest you are applying for. Our HR team will review
              your application and contact you directly if there is a potential
              match.
            </span>
          </Col>
          <Col md={5} className="flex justify-center order-md-2 order-1">
            <div className="careerImgDiv">
              <Image src="/images/CareerImage.png" alt=""></Image>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="BG-gradient pt-5 pb-5 openPosition">
        <div className="container">
          <h2 className="FW-semibold text-center mb-5">Open Position</h2>
          <TestCarouselTest />
        </div>
      </div>
      <section className="py-5 mb-4">
        <Card className="mx-auto py-3 px-2 applicationForm">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h5 className="FW-extrabold mb-4" style={{ color: "#C01E58" }}>
                Application Form
              </h5>
              <Form.Group className="mb-4" as={Row}>
                <Col sm={6} className="mb-4 mb-sm-0">
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={values?.first_name}
                    onChange={handleChangeCareer}
                    isInvalid={!!errors.first_name}
                    placeholder="First Name"
                    className="FS-14 shadow-none borderRadius-5 FW-semibold"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={values?.last_name}
                    onChange={handleChangeCareer}
                    isInvalid={!!errors.last_name}
                    placeholder="Last Name"
                    className="FS-14 shadow-none borderRadius-5 FW-semibold"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-4" as={Row}>
                <Col sm={6} className="mb-4 mb-sm-0">
                  <Form.Control
                    type="email"
                    name="email"
                    value={values?.email}
                    placeholder="Email"
                    className="FS-14 shadow-none borderRadius-5 FW-semibold"
                    onChange={handleChangeCareer}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid" className="text-start">
                    {errors.email}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={6}>
                  <Form.Control
                    type="tel"
                    name="mobile_no"
                    value={values?.mobile_no}
                    placeholder="Contact Number"
                    className="FS-14 shadow-none borderRadius-5 FW-semibold"
                    onChange={handleChangeCareer}
                    isInvalid={!!errors.mobile_no}
                  />
                  <Form.Control.Feedback type="invalid" className="text-start">
                    {errors.mobile_no}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  name="apply_for"
                  value={values?.apply_for}
                  onChange={handleChangeCareer}
                  isInvalid={!!errors.apply_for}
                  placeholder="Applied for "
                  className="FS-14 shadow-none borderRadius-5 FW-semibold"
                />
                <Form.Control.Feedback type="invalid" className="text-start">
                  {errors.apply_for}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descriptions"
                  value={values?.descriptions}
                  onChange={handleChangeCareer}
                  placeholder="Description"
                  className="FS-14 shadow-none borderRadius-5 FW-semibold"
                />
                <Form.Control.Feedback type="invalid" className="text-start">
                  {errors.descriptions}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Control
                  type="file"
                  size="sm"
                  name="resume"
                  value={values?.resume ??  ""}
                  onChange={handleChangeCareer} />
              </Form.Group>
              {/* <div className="file-input mb-4">
                <input
                  type="file"
                  name="file-input"
                  id="file-input"
                  className="file-input__input"
                />
                <label
                  className="file-input__label d-flex align-items-center w-fit border py-2 ps-2 pe-5 borderRadius-5"
                  htmlFor="file-input"
                >
                  <i className="icon-careerUpload me-2"></i>
                  <span className="FS-14 FW-semibold">Upload Resume</span>
                </label>
              </div> */}
              <button
                className="borderRadius-5 border-none px-5 py-2 FW-bold FS-16 text-white pinkBtn"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <p style={{ color: "black" }}>{error}</p>
              <p style={{ color: "black" }}>{success}</p>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default Career;
