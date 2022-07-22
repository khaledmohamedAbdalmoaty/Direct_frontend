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



export const CreateChannelSchema=yup.object({
  channelName: yup
    .string('Enter your channel name')
    .required('channel name is required'),
    priority: yup
    .string('Enter channel priority number ')
    .required('priority is required'),

});


export const changePriorityNumberScheam=yup.object({
    priority: yup
    .string('Enter channel priority number ')
    .required('priority is required'),

});


export const AddProjectCardSchema=yup.object({
   projectName: yup
  .string('Enter project Name ')
  .required('project Name  is required'),

});


export const AddSchoolCardSchema=yup.object({
  schoolName: yup
 .string('Enter School Name ')
 .required('School Name   is required'),

});

export const SendEmailSchema=yup.object({
  headerTitle: yup
 .string('Enter header of Email ')
 .required('Email header title is required'),
 emailBody: yup
 .string('Enter your Email body  ')
 .required('Email body is required')

});