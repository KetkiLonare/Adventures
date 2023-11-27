import { useAppContext } from "@/src/hooks/UserContext";
import useForm from "@/src/hooks/useForm";
import { validateQuote } from "@/src/validate/validateQuote";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import sendHttpRequest from "../../src/http/Request";

const SendOrderDetails = ({ id, closemodel, show }) => {
  const { state, dispatch } = useAppContext();
  const newData = state?.userdata;
  const userId = state?.userdata?.id;
  const [formobj, setformObj] = useState({});
  const [FailedMsg, setFailedMsg] = useState();
  
  const Submit = async (e) => {
    try {
      const resquote = await sendHttpRequest(
        "post",
        `/authroute/getquote`,
        {},
        {
          ...values,
          users: userId,
          products: id,
          isCustomisedItem: true,
        }
      );
      const resid = resquote?.data?.id;
      if (resid) {
        closemodel(!show);
        dispatch({ type: "formSubmission", payload: true });
        for (let each of Object.values(state?.customSelection)) {
          const data = {
            getquote: resid,
            users: state?.userdata?.id,
            customizeditems: each,
            products: id,
          };
          const resitem = await sendHttpRequest(
            "post",
            `/authroute/user_quote_items`,
            {},
            { ...data }
          );
        }
      }

      dispatch({ type: "clearCustomeSelection" });
    } catch (error) {
      console.error(error); // Print the error to the console
      setFailedMsg("Failed to submit form please try again");
    }
  };

  const { values, handleSubmit, setErrors, errors, setValues } = useForm(
    Submit,
    validateQuote,
    formobj
  );

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setErrors({ ...errors, [name]: null });
    // For text and email inputs, set the value directly
    if (type != "checkbox") {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      // For checkboxes, toggle the value based on the current checked state
      setValues({
        ...values,
        [name]: checked ? value : undefined, // Set to `undefined` when unchecked
      });
    }
  };

  useEffect(() => {
    state?.userdata &&
      setValues({
        ...values,
        name: state?.userdata?.name,
        email: state?.userdata?.email,
        mobile_no: state?.userdata?.mobile_no,
      });
  }, [state?.userdata]);

  return (
    <>
      <div className="row-span-2 bg-white px-4 pt-3 boxShadow-none quoteContainer sendOrderDetails">
        <h5 className="FW-extrabold">Send Order Details</h5>
        <span className="FW-medium block my-2">{`You have selected ${
          !!Object.values(state?.customSelection)?.length
            ? Object.values(state?.customSelection)?.length
            : 0
        }  customize items`}</span>
        <div>
          <Form className="row" onSubmit={handleSubmit}>
            <div className="col">
              <Form.Group controlId="fullName">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  className="first-input p-2 my-2 shadow-none"
                  name="name"
                  value={values.name}
                  isInvalid={errors?.name}
                  // disabled={state?.userdata?.name}
                  onChange={handleChange}
                />
                {/* {errors?.name && <span style={{ color: "red" }}>{errors?.name}</span>} */}
              </Form.Group>
            </div>

            <div className="col">
              <Form.Group>
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  className="first-input p-2 my-2 shadow-none"
                  name="mobile_no"
                  value={values?.mobile_no}
                  isInvalid={errors?.mobile_no}
                  // disabled={state?.userdata?.mobile_no}
                  onChange={handleChange}
                />
                {/* {errors?.mobile_no && <span style={{ color: "red" }}>{errors?.mobile_no}</span>} */}
              </Form.Group>
            </div>

            <div className="col">
              <Form.Group controlId="email">
                <Form.Control
                  className="first-input p-2 my-2 shadow-none"
                  type="email"
                  name="email"
                  value={values?.email}
                  isInvalid={errors?.email}
                  // disabled={state?.userdata?.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
                {/* {errors?.email && <span style={{ color: "red" }}>{errors?.email}</span>} */}
              </Form.Group>
            </div>

            <Form.Group className="my-2">
              <Form.Label className="FW-semibold">
                What's your preferred method of contact? *
              </Form.Label>
              <div className="row g-0">
                <Form.Check
                  type="checkbox"
                  name="contact_method"
                  value="Call"
                  checked={values?.contact_method === "Call"}
                  onChange={handleChange}
                  label="Call"
                  id={"Call"}
                  isInvalid={errors?.contact_method}
                  className="FW-semibold FS-14 col"
                />
                <Form.Check
                  type="checkbox"
                  name="contact_method"
                  value="Text"
                  checked={values?.contact_method === "Text"}
                  onChange={handleChange}
                  label="Text"
                  id={"Text"}
                  isInvalid={errors?.contact_method}
                  className="FW-semibold FS-14 col"
                />
                <Form.Check
                  type="checkbox"
                  name="contact_method"
                  value="Email"
                  checked={values?.contact_method === "Email"}
                  onChange={handleChange}
                  label="Email"
                  id={"Email"}
                  isInvalid={errors?.contact_method}
                  className="FW-semibold FS-14 col"
                />
              </div>
              {/* {errors?.contact_method && <span>{errors?.contact_method}</span>} */}
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label className="FW-semibold">
                Where do you plan on placing the home? *
              </Form.Label>
              <div className="row g-0">
                <Form.Check
                  type="checkbox"
                  name="plan_home"
                  value="On land that I own"
                  checked={values?.plan_home === "On land that I own"}
                  isInvalid={errors?.plan_home}
                  onChange={handleChange}
                  label="On land that I own"
                  id={"On land that I own"}
                  className="FW-semibold FS-14 col"
                />
                <Form.Check
                  type="checkbox"
                  name="plan_home"
                  value="On land Im looking to buy"
                  checked={values?.plan_home === "On land Im looking to buy"}
                  onChange={handleChange}
                  isInvalid={errors?.plan_home}
                  label="On land I'm looking to buy"
                  id={"On land I'm looking to buy"}
                  className="FW-semibold FS-14 col"
                />
                <Form.Check
                  type="checkbox"
                  name="plan_home"
                  value="In a MH community"
                  checked={values?.plan_home === "In a MH community"}
                  onChange={handleChange}
                  isInvalid={errors?.plan_home}
                  label="In a MH community"
                  id={"In a MH community"}
                  className="FW-semibold FS-14 col"
                />
                {/* {errors?.plan_home && <span>{errors?.plan_home}</span>} */}
              </div>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label className="FW-semibold">
                When are you planning to build?
              </Form.Label>
              <div className="row g-0">
                <Form.Check
                  type="checkbox"
                  name="month"
                  value="0-3 months"
                  checked={values?.month === "0-3 months"}
                  onChange={handleChange}
                  isInvalid={errors?.month}
                  label="0-3 months"
                  id={"0-3 months"}
                  className="FW-semibold FS-14 col"
                />
                <Form.Check
                  type="checkbox"
                  name="month"
                  value="3-6 months"
                  checked={values?.month === "3-6 months"}
                  onChange={handleChange}
                  isInvalid={errors?.month}
                  label="3-6 months"
                  id={"3-6 months"}
                  className="FW-semibold FS-14 col"
                />

                <Form.Check
                  type="checkbox"
                  name="month"
                  value="6+ months"
                  checked={values?.month === "6+ months"}
                  onChange={handleChange}
                  label="6+ months"
                  id={"6+ months"}
                  isInvalid={errors?.month}
                  className="FW-semibold FS-14 col"
                />
                {/* {errors?.month && <span>{errors?.month}</span>} */}
              </div>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Control
                as="textarea"
                rows={10}
                type="text"
                placeholder="Enter Your Message"
                className="p-3 w-full orderDetailsTextarea"
                name="quote"
                isInvalid={errors?.quote}
                value={values.quote}
                onChange={handleChange}
              />
              {/* {errors?.quote && <span>{errors?.quote}</span>} */}
            </Form.Group>

            <span className="block FS-12 my-3">
              By submitting the information, you are directing Apex Modular
              Solution to share your personal information for communication.
            </span>

            <div className="px-2">
              <Button
                className="w-auto py-2 px-3 mr-2 FW-bold border-0"
                type="submit"
              >
                Submit Details
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SendOrderDetails;
