import useForm from "@/src/hooks/useForm";
import sendHttpRequest from "@/src/http/Request";
import { formObj } from "@/src/validate/validateSignUp";
import { validateEmail } from "@/src/validate/validationLogin";
import Link from "next/link";
import { useAppContext } from "@/src/hooks/UserContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import OtpInput from "react-otp-input";

const Forgetpassword = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const [forgetPass, setForgetPass] = useState(2);
  console.log(forgetPass+1,"forgetPass")
  const [otp, setOtp] = useState("");
  console.log(otp)

  const submit = async (e) => {
    e.preventDefault();
    validateEmail(values?.email);

    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
     return  errors.email = "Email address is invalid";
    }

    try {
      const res = await sendHttpRequest(
        "post",
        "/auth/send-otp",
        {},
        values,
        true
      );
      console.log(res, "res is here")
      if (res) {
        setForgetPass(forgetPass + 1);
        // setOtpSend(true)
      }
    } catch (e) {
      console.log(e);
    }
  };

  
  const httpPost = async () => {
    try {
      if (isNaN(otp) || otp.length !== 6) {
        setErrors("Please enter a valid OTP");
        return;
      }
  
      const resVerify = await sendHttpRequest(
        "post",
        "/auth/verify-otp",
        {},
        {
          email: values?.email,
          otp: otp,
          // Add any other necessary fields if needed
        },
        true
      );
      console.log("Server Response:", resVerify);

      if (resVerify && resVerify?.data?.status == "SUCCESS") {
        setForgetPass(forgetPass + 1);
         setOtp("");
      } else {
        // Handle the case where verification fails
        // console.error("OTP verification failed:", resVerify.message);
        setErrors("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      // Handle other errors as needed
    }
  };
  
  

  const httpResetPassword = async () => {
    try {
      console.log("click here")
      // if (isNaN(otp) || otp.length != 6) {
      //   router?.push('/');
      //   setErrors("Please enter a valid OTP");
      //   alert("click here")
      // } 
        const res = await sendHttpRequest(
          "post",
          "/auth/reset-password-otp",
          {},
          {
            email: values?.email,
            password: values?.password,
            confirm_password: values?.confirm_password,
          },
          true
        );
        console.log(res,"res....")
        // if (res) {
        //   alert("I am here")
        // }
      
    } catch (error) {
      console.error("Error during password reset:", error);
    } finally {
      // setSpinner(false);
    }
  };

  const { handleChange, handleSubmit, values,setValues, errors, setErrors } = useForm(
    submit,
    validateEmail,
    formObj
  );
  console.log(values, "values is here")
  return (
    <div>
      {forgetPass == 0 && <Card className="py-3 px-4 loginCard text-center">
        <h1 className="mb-4">Forgot Password</h1>
        <Card.Body>
          <Form className="text-center" onSubmit={submit}>
            <Form.Group>
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
            <Button
              className="w-100 borderRadius-5 border-none py-2.5 FW-bold FS-16 signInBtn my-3"
              disabled={!values?.email}
              type="submit"
            >
              Send OTP
            </Button>
            <a href=""></a>
            <Link href="/" className="text-primary underline">Back To Login</Link>
          </Form>
        </Card.Body>
      </Card>}
      <>
        <>
          {forgetPass == 1 && (
            <Form className="text-center">
              <div className="otpVerify px-2 py-4">
                <h2 className="FW-semibold mb-3">OTP Verification</h2>
                <p className="FW-regular">
                  We've e-mailed you a 6 digit code. Please check your email and
                  enter the code here to reset your password.
                </p>
                <div className="otp-container">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        type="text"
                        class="form-control otp-input"
                        maxlength="1"
                      />
                    )}
                  />
                </div>
                <div className="my-3 FW-regular">
                  Didn't receive the OTP?{" "}
                  <Link href="/" className="grey-color">
                    Resend
                  </Link>
                </div>
                <div>
                  <Button
                    className="pinkBtn border-none me-2 px-4"
                    onClick={() => {
                      setForgetPass(0);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={httpPost}
                    className="pinkBtn border-none ms-2 px-4"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </Form>
          )}

          {forgetPass === 2 && (
            <Form className="vertical-form py-2 px-3" name="basic">
              <div className="otpVerify px-2 py-4">
                <h2 className="mb-3 FW-semibold text-center">
                  Change Password
                </h2>
                <Form.Group controlId="formGridEmail" className="mb-3">
                  <Form.Label className="FW-semibold">New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={values?.password}
                    onChange={handleChange}
                    required
                    className="shadow-none border-secondary-subtle"
                  />
                </Form.Group>

                <Form.Group controlId="formGridPassword" className="mb-3">
                  <Form.Label className="FW-semibold">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm_password"
                    placeholder="Enter Confirm Password"
                    value={values?.confirm_password}
                    onChange={handleChange}
                    required
                    className="shadow-none border-secondary-subtle"
                  />
                </Form.Group>
                {/* <div className='mb-3 grey-color mt-2 '>
                  Didn't receive the OTP? <Link href="/" className='grey-color'>Resend</Link>
                </div> */}

                <div className="d-flex">
                  <Button
                    className="pinkBtn border-none me-2 px-4"
                    onClick={() => setForgetPass(1)}
                  >
                    Back
                  </Button>
                  {/* <Button
                    className="pinkBtn border-none me-2 px-4"
                    onClick={() => {
                      dispatch({ type: "togglelogin", payload: true }),
                        httpResetPassword;
                    }}
                  >
                    <Link href=""></Link>
                    Verify
                  </Button> */}
                  <Button  className="pinkBtn border-none me-2 px-4" onClick={httpResetPassword}>Verify</Button>
                </div>
              </div>
            </Form>
          )}
        </>
      </>
    </div>
  );
};

export default Forgetpassword;
