import * as yup from 'yup';
export const RegistervalidationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
      confirmPassword:yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password again is required'),
      userName:yup
      .string("Enter your user name ")
      .required("userName is required")
});


export const loginValidationSchema=yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')

});