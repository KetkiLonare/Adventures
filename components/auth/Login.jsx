import useForm from "@/src/hooks/useForm";
import { NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY } from "@/src/utlis/envConfig";
import { validateEmail } from "@/src/validate/validationLogin";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Form, Button } from "react-bootstrap";
import sendHttpRequest from "../../src/http/Request";
import getwishlistdata from "../../src/utlis/getwishlist";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Login = ({ dispatch }) => {
  const router = useRouter();

  const [msg, setMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);


  const signin = async (e) => {
    try {
      // const res = await postReq({
      //   url: `http://localhost:4000/auth/login`,
      //   data: values,
      //   isGuestApi: true,
      //   returnDataKey: "authdata",
      // });

      const res = await sendHttpRequest(
        "post",
        "/auth/login",
        {},
        values,
        true
      );

      if (res?.status == 400) {
        setMsg(res.data.message);
      }

      if (res?.data?.authdata) {
        const { user } = res?.data?.authdata;
        sessionStorage.setItem(
          `${NEXT_PUBLIC_APP_CLIENT_SESSION_STORAGE_KEY}`,
          JSON.stringify(res?.data?.authdata)
        );
        dispatch({ type: "setuserdata", payload: user });
        dispatch({ type: "logout", payload: false });

        const wishlistdata = await getwishlistdata(user.id);

        dispatch({ type: "GetWishlist", payload: wishlistdata });

        dispatch({ type: "togglelogin", payload: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlesignup = () => {
    dispatch({ type: "togglelogin", payload: false });
    dispatch({ type: "togglesignup", payload: true });
  };

  const formObj = { email: "", password: "" };
  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    signin,
    validateEmail,
    formObj
  );

  return (
    // <section className="vh-100" style={{ backgroundColor: '#000000CF' }}>
    //   <Container className="py-5 h-100">
    //     <Row className="d-flex justify-content-center align-items-center h-100">
    //       <Col xs={12} md={8} lg={6} xl={5}>
    <Card className="py-3 px-4 loginCard">
      <Card.Body>
        <h5 className="FW-extrabold" style={{ color: "#C01E58" }}>
          Sign In
        </h5>

        <span className="FW-medium block my-3">
          Sign in with account across the following site.
        </span>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              name="email"
              value={values?.email}
              placeholder="Email"
              className="FS-14 shadow-none borderRadius-5 FW-semibold"
              onChange={handleChange}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Control
              type={showPassword ? "text":"password"}
              name="password"
              value={values?.password}
              placeholder="Password"
              className="FS-14 shadow-none borderRadius-5 FW-semibold position-relative"
              onChange={handleChange}
              isInvalid={errors.password}
            />
            <Button
                  // variant="outline-secondary"
                  className="password-toggle-button text-dark border-0 position-absolute right-10"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility on button click
                >
                  {showPassword ? <HiEyeSlash /> : <HiEye/>}
                </Button>
            <Form.Control.Feedback type="invalid" className="text-start">
              {errors?.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="flex pl-0 justify-between mb-4 passwordRemLost">
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="FS-14 FW-regular"
            />
            <div
              role="button"
              onClick={() => {
                dispatch({ type: "forgettoggle", payload: true }),
                  dispatch({ type: "togglelogin", payload: false });
              }}
              className="FS-14 FW-regular"
            >
              Lost your password ?
            </div>
          </Form.Group>

          <Button
            className="w-100 borderRadius-5 border-none py-2.5 FW-bold FS-16 signInBtn"
            type="submit"
          >
            Sign In
          </Button>
          <p style={{ color: "red" }}>{msg}</p>
          {/* <hr className="my-4" /> */}
          <p className="FS-12 FW-bold my-4 orDivider">OR</p>

          {/* <Button className="w-100 borderRadius-5 FW-regular FS-14 py-2.5 googleBtn">
            Continue Google
          </Button> */}
          <div className="d-flex justify-content-center">
            <GoogleOAuthProvider clientId="151957029597-rmchue832574rapl09joerlb4i5srgbl.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const decoded = jwt_decode(credentialResponse?.credential);

                    const { name, email } = decoded;
                    const useData = { email, name };
                    const response = await sendHttpRequest(
                      "post",
                      "/CRUD/users",
                      { where: { email: email } },
                      useData
                    );

                    // const authToken = response.data.authToken;
                    // localStorage.setItem('authToken', authToken);
                  } catch (error) {
                    console.error(error);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                className="google-login-button"
              />
            </GoogleOAuthProvider>
          </div>

          <span className="my-3 text-center block FS-12 FW-regular">
            Not signed up?{" "}
            <button onClick={() => handlesignup()} className="FW-bold">
              {" "}
              Create an account{" "}
            </button>
          </span>
        </Form>
      </Card.Body>
    </Card>
    //     </Col>
    //   </Row>
    // </Container>
    // </section>
  );
};

export default Login;
