import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { setUncontrolledFormData } from '../../store/formSlice';
import CountryAutocomplete from '../../components/CountryAutocomplete';
import styles from './UncontrolledForm.module.css';
import { toBase64 } from '../../utils/toBase64';
import { schema } from '../../validation/schema';

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

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = () => {
    setIsSubmitting(false);
    setErrors({});
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const fileInput = formElement.elements.namedItem(
      'picture'
    ) as HTMLInputElement;
    const fileList = fileInput.files;

    if (!fileList) {
      setErrors({ picture: 'Picture is required' });
      return;
    }

    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      picture: fileList,
      country: formData.get('country') as string,
    };

    try {
      setIsSubmitting(true);
      await schema.validate(data, { abortEarly: false });

      const base64Picture = await toBase64(fileList[0]);

      dispatch(
        setUncontrolledFormData({
          ...data,
          picture: base64Picture,
          timestamp: Date.now(),
        })
      );

      if (formElement) {
        formElement.reset();
      }
      setErrors({});
      console.log('Navigating to home page');
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
        console.error('Validation errors:', validationErrors);
      } else {
        console.error('Unexpected error:', err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Uncontrolled Form</h1>
        <form onSubmit={handleSubmit} onChange={handleChange}>
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
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender">
              <option value="">Select Gender</option>
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
            <CountryAutocomplete name="country" />
            {errors.country && <p>{errors.country}</p>}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={hasErrors || isSubmitting}
            style={{
              opacity: hasErrors || isSubmitting ? 0.5 : 1,
              cursor: hasErrors || isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UncontrolledForm;
