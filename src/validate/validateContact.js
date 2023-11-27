export const validateContact = (values) => {
  let errors = {};
  if (!values?.fullName) {
    errors.fullName = "fullName is required";
  }
  if (!values?.email) {
    errors.email = "email is required";
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email address is invalid";
}
  if (!values?.mobile_no) {
    errors.mobile_no = "mobile_no is required";
  }
  if (!values?.description) {
    errors.description = "description is required";
  }


  return errors;
};
