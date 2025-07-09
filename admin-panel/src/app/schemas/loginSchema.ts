import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid Email, Please enter a valid email.")
    .required("Email is a required Field"),
  password: Yup.string().required("Password is a required field"),
});
