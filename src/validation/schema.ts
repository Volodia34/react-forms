import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Перша буква повинна бути великою')
    .required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      'Має містити цифру, велику, малу літери та спец. символ'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Паролі повинні збігатися')
    .required(),
  gender: yup.string().required(),
  terms: yup.boolean().oneOf([true], 'Прийміть умови').required(),
  picture: yup.mixed().required(),
  country: yup.string().required(),
});
