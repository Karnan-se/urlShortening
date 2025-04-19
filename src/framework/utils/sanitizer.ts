import * as yup from 'yup';


const passwordRules = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
  .matches(/^\S*$/, 'Password must not contain spaces');

export const registerUserSchema = yup.object().shape({
    name:yup.string().required("Username is required"),
    email: yup.string().email('Invalid email').required('Email is required'),
    password:passwordRules,
})