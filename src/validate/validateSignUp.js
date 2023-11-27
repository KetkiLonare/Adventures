// import { titleCase } from "@/src/utlis/caseConsistent";
export const formObj = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  mobile_no: ""
};


export const validate = (values) => {
  let errors = {};
  Object.keys(formObj).forEach((key) => {
    if (!values[key]) {
      errors[key] = `${(key)} is required`;
    }
  });

  // if (!values.name) {
  //   errors.name = "Full name is required";
  // }
  // if (!values.password) {
  //   errors.password = "password is required";
  // }

  return errors;
};

