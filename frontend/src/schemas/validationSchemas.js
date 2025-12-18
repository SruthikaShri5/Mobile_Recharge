import * as yup from 'yup';

// Login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

// Signup validation schema
export const signupSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number')
    .test('not-all-zeros', 'Phone number cannot be all zeros', value => value !== '0000000000')
    .test('valid-start', 'Phone number must start with 6, 7, 8, or 9', value => /^[6-9]/.test(value)),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

// Recharge validation schema
export const rechargeSchema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
    .test('not-all-zeros', 'Mobile number cannot be all zeros', value => value !== '0000000000')
    .test('valid-start', 'Mobile number must start with 6, 7, 8, or 9', value => /^[6-9]/.test(value)),
  operator: yup
    .string()
    .required('Please select an operator'),
  planType: yup
    .string()
    .required('Please select a plan type')
});