import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const FILE_SIZE = 1024 * 1024;

const isFileList = (value: any): value is FileList => {
  return value && value instanceof FileList && value.length > 0;
};

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup.number().positive().integer().required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup.boolean().oneOf([true], 'Accept Terms and Conditions').required(),
  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'File too large', (value) => {
      if (!isFileList(value)) return false;
      return value[0].size <= FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      if (!isFileList(value)) return false;
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
  country: yup.string().required('Country is required'),
});
