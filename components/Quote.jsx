import { useAppContext } from "@/src/hooks/UserContext";
import useForm from "@/src/hooks/useForm";
import { validateQuote } from "@/src/validate/validateQuote";
import React, { useState, useMemo, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import sendHttpRequest from "../src/http/Request";

const generatePassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const QuoteForm = ({ productid }) => {
  const { state, dispatch } = useAppContext();

  const [quote, setQuote] = useState();
  const [val, setVal] = useState();
  const [success, setSuccess] = useState();

  const [id, setid] = useState();

  const [FailedMsg, setFailedMsg] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const userId = state?.userdata?.id;
  const [formobj, setformObj] = useState({ enquiry_status: "New" });
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const Submit = async (e) => {
    try {
      // const isFormEmpty = Object.values(values).every(
      //   (value) => value.trim() === ""
      // ); // Check if all fields are empty or whitespace-only
      // if (isFormEmpty) {
      //   setVal("Please fill out the form");
      //   setTimeout(() => {
      //     setVal("");
      //   }, 10000);

      //   return;
      // }
      if (state?.logout == true) {
        const password = await generatePassword();
        const resData = await sendHttpRequest(
          "post",
          "/auth/auto-sign-up",
          {},
          {
            email: values?.email,
            name: values?.name,
            mobile_no: values?.mobile_no,
            password: password,
            confirm_password: password,
          },
          true
        );

        setid(resData?.id);
      }

      const res = await sendHttpRequest(
        "post",
        `/CRUD/getquote`,
        {},
        { ...values, users: state?.logout ? id : userId, products: productid }
      );
      setQuote(res.data.result);
      setValues({
        name: state?.userdata?.name,
        email: state?.userdata?.email,
        mobile_no: state?.userdata?.mobile_no,
      });

      setSuccess("Form Submitted successfully");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
      setFormSubmitted(true);
      handleShowModal();
      dispatch({ type: "formSubmission", payload: true });
    } catch (error) {
      setFailedMsg("Failed to submit form please try again");
      // Display error toast
    }
  };

  const {
    values,
    handleSubmit,
    setErrors,
    setIsSubmitting,
    errors,
    setValues,
  } = useForm(Submit, validateQuote, formobj);

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

  useMemo(() => {
    console.log(values, "useMemo");
  }, [values]);

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
    <div className="bg-white p-8 boxShadow quoteContainer" id="quote_section">
      <h5 className="FW-extrabold">Get Information</h5>
      <span className="FW-medium">
        Use this form to request more information and pricing.
      </span>
      <div className="row">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              className="w-full first-input p-2 my-2 shadow-none"
              name="name"
              value={values?.name ?? ""}
              // isInvalid={errors?.name}
              // disabled={!!state?.userdata?.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="tel"
              placeholder="Phone"
              className="w-full first-input p-2 my-2 shadow-none"
              name="mobile_no"
              value={values?.mobile_no ?? ""}
              // isInvalid={errors?.mobile_no}
              // disabled={!!state?.userdata?.mobile_no}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              className="w-full first-input p-2 my-2 shadow-none"
              type="email"
              name="email"
              value={values?.email ?? ""}
              // isInvalid={errors?.email}
              // disabled={!!state?.userdata?.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="FW-semibold">
              What's your preferred method of contact? *
            </Form.Label>
            <Form.Check
              type="checkbox"
              name="contact_method"
              value="Call"
              checked={values?.contact_method == "Call"}
              onChange={handleChange}
              label="Call"
              id={"Call"}
              // isInvalid={errors?.contact_method}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="contact_method"
              value="Text"
              checked={values?.contact_method == "Text"}
              onChange={handleChange}
              label="Text"
              id={"Text"}
              // isInvalid={errors?.contact_method}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="contact_method"
              value="Email"
              checked={values?.contact_method == "Email"}
              onChange={handleChange}
              label="Email"
              id={"Email"}
              // isInvalid={errors?.contact_method}
              className="FW-semibold FS-14"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="FW-semibold">
              Where do you plan on placing the home? *
            </Form.Label>
            <Form.Check
              type="checkbox"
              name="plan_home"
              value="On land that I own"
              checked={values?.plan_home == "On land that I own"}
              onChange={handleChange}
              label="On land that I own"
              id={"On land that I own"}
              // isInvalid={errors?.plan_home}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="plan_home"
              value="On land Im looking to buy"
              checked={values?.plan_home == "On land Im looking to buy"}
              onChange={handleChange}
              label="On land I'm looking to buy"
              // isInvalid={errors?.plan_home}
              id={"On land I'm looking to buy"}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="plan_home"
              value="In a MH community"
              checked={values?.plan_home == "In a MH community"}
              onChange={handleChange}
              label="In a MH community"
              // isInvalid={errors?.plan_home}
              id={"In a MH community"}
              className="FW-semibold FS-14"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="FW-semibold">
              When are you planning to build?
            </Form.Label>
            <Form.Check
              type="checkbox"
              name="month"
              value="0-3 months"
              checked={values?.month == "0-3 months"}
              onChange={handleChange}
              label="0-3 months"
              // isInvalid={errors?.month}
              id={"0-3 months"}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="month"
              value="3-6 months"
              checked={values?.month == "3-6 months"}
              onChange={handleChange}
              label="3-6 months"
              // isInvalid={errors?.month}
              id={"3-6 months"}
              className="FW-semibold FS-14"
            />
            <Form.Check
              type="checkbox"
              name="month"
              value="6+ months"
              checked={values?.month == "6+ months"}
              onChange={handleChange}
              label="6+ months"
              id={"6+ months"}
              // isInvalid={errors?.month}
              className="FW-semibold FS-14"
            />
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Control
              as="textarea"
              rows={10}
              type="text"
              placeholder="Enter Your Message"
              className="p-3 w-full"
              name="quote"
              // isInvalid={errors?.quote}
              value={values.quote ?? ""}
              onChange={handleChange}
            />
          </Form.Group>
          <span className="block FS-12 my-3">
            By submitting the information, you are directing Apex Modular
            Solution to share your personal information for communication.
          </span>

          <Button
            className="py-2 px-3 bg-slate-400 mr-2 FW-bold border-0"
            type="submit"
          >
            Request Information
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default QuoteForm;
