import useForm from "@/src/hooks/useForm";
import { NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY } from "@/src/utlis/envConfig";
import validateLogin from "@/src/validate/validationLogin";
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import sendHttpRequest from "../../src/http/Request";
import { HiEye, HiEyeSlash } from 'react-icons/hi2'


const SignUp = ({ dispatch }) => {
  const [msg, setMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const signup = async () => {
    try {
      const res = await sendHttpRequest(
        "post",
        "/auth/sign-up",
        {},
        values,
        true
      );

      if (res.status == 400) {
        setMsg(res?.data?.message);
      } else {
        if (res?.data?.authdata) {
          const { user } = res?.data?.authdata;

          if (user) {
            sessionStorage.setItem(
              `${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`,
              JSON.stringify(res?.data?.authdata)
            );
            dispatch({ type: "setuserdata", payload: user });
            dispatch({ type: "logout", payload: false });
          }
        }
        dispatch({ type: "togglesignup", payload: false });
        //  dispatch({ type: "togglelogin", payload: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlelogin = () => {
    dispatch({ type: "togglesignup", payload: false });
    dispatch({ type: "togglelogin", payload: true });
  };

  const formObj = {
    name: "",
    email: "",
    password: "",
    mobile_no: "",
    confirm_password: "",
  };
  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    signup,
    validateLogin,
    formObj
  );


  return (
    // <section className=" gradient-custom bg-gray" style={{ backgroundColor: "#000000CF" }} >
    //     <Container className="py-5 h-50"  >
    //         <Row className="d-flex justify-content-center align-items-center ">
    //             <Col xs={12} md={8} lg={6} xl={5}>
    <Card className="py-3 px-4 signUpCard">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <h5 className="FW-extrabold" style={{ color: "#C01E58" }}>
            Sign Up
          </h5>
          <span className="FW-medium block my-3">
            Fill the below details to create an account{" "}
          </span>

          <Form.Group className="mb-4">
            <Form.Control
              type="name"
              name="name"
              value={values?.name}
              placeholder="Full Name"
              className="FS-14 shadow-none borderRadius-5 FW-semibold"
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              name="email"
              value={values?.email}
              placeholder="Email"
              className="FS-14 shadow-none borderRadius-5 FW-semibold"
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="tel"
              name="mobile_no"
              value={values?.mobile_no}
              placeholder="Phone Number"
              className="FS-14 shadow-none borderRadius-5 FW-semibold"
              onChange={handleChange}
              isInvalid={!!errors.mobile_no}
            />
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.mobile_no}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={values?.password}
              placeholder="Password"
              className="FS-14 shadow-none borderRadius-5 FW-semibold position-relative"
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
             <Button
                  className="password-toggle-button border-0 position-absolute right-10 text-dark"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on button click
                >
                  {showPassword ? <HiEye /> : <HiEyeSlash />}
                </Button>
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={values?.confirm_password}
              placeholder="Confirm Password"
              className="FS-14 shadow-none borderRadius-5 FW-semibold  position-relative"
              onChange={handleChange}
              isInvalid={!!errors.confirm_password}
            />
              <Button
                  variant="outline-secondary"
                  className="password-toggle-button  border-0 position-absolute right-10 text-dark"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility on button click
                >
                  {showConfirmPassword ? <HiEye /> : <HiEyeSlash />}
                </Button>
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.confirm_password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            className="w-100 borderRadius-5 border-none py-2.5 FW-bold FS-16 signUpBtn"
            type="submit"
          >
            Sign Up
          </Button>

          <span className="my-3 text-center block FS-12 FW-regular">
            Already have an account?{" "}
            <button onClick={() => handlelogin()} className="FW-bold">
              Login
            </button>
            <p style={{ color: "red" }}>{msg && msg}</p>
          </span>
        </Form>
      </Card.Body>
    </Card>
    //             </Col>
    //         </Row>
    //     </Container>
    // </section>
  );
};

export default SignUp;
