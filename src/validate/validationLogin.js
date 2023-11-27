
export default function validateLogin(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.name) {
    errors.name = "Full name is required";
  } else if (values.name.includes()) {
    errors.name = "Full name is required";
  }
  if (!values.mobile_no) {
    errors.mobile_no = "Phone number is required";
  } else if (values.mobile_no.includes(" ")) {
    errors.mobile_no = "Phone number is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.includes(" ")) {
    errors.password = "Password is required";
  }


  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required";
  } else if (values.confirm_password.includes(" ")) {
    errors.confirm_password = "Confirm password is required";
  }
  // else if (!/^\S*$/.test(values.password)){
  //     errors.password = "Password is invalid";
  // }


  // if (values?.mobile_no && values.mobile_no.length != 10) {
  //     errors.mobile_no = "Phone number needs to be 10 digits long";
  // }
  return errors;
}


export const validateEmail = values => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.includes(" ")) {
    errors.password = "password is required";
  }
  return errors;

}


