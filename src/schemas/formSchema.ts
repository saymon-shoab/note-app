import * as yup from "yup";

export const singupSchema = yup.object().shape({
  userName: yup.string().required("please provide your user name"),
  email: yup
    .string()
    .email("please provide a valid email address")
    .required("email address is required"),
  password: yup
    .string()
    .min(6, "password should have a minimum length of 6")
    .max(18, "password should have a maximum length of 18")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required("confirm password is required"),
});




export const loginSechema = yup.object().shape({
  email: yup
    .string()
    .email("please provide a valid email address")
    .required("email address is required"),
  password: yup
    .string()
    .required("password is required"),

});

