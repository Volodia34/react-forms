import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { setUncontrolledFormData } from '../../store/formSlice';
import styles from './UncontrolledForm.module.css';

interface FormErrors {
  [key: string]: string | undefined;
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  picture?: string;
  country?: string;
}

const schema = yup.object().shape({
  name: yup.string().matches(/^[A-Z]/, 'First letter must be uppercase').required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be strong').required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match').required(),
  gender: yup.string().required(),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  picture: yup.mixed().required(),
  country: yup.string().required(),
});

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      picture: formData.get('picture') as string,
      country: formData.get('country') as string,
    };

    schema.validate(data, { abortEarly: false })
      .then(() => {
        dispatch(setUncontrolledFormData(data));
        navigate('/');
      })
      .catch((err) => {
        const validationErrors: FormErrors = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Uncontrolled Form</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="age">Age</label>
            <input type="number" name="age" id="age" />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="terms">Accept Terms and Conditions</label>
            <input type="checkbox" name="terms" id="terms" />
            {errors.terms && <p>{errors.terms}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="picture">Upload Picture</label>
            <input type="file" name="picture" id="picture" />
            {errors.picture && <p>{errors.picture}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="country">Country</label>
            <input type="text" name="country" id="country" />
            {errors.country && <p>{errors.country}</p>}
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UncontrolledForm;