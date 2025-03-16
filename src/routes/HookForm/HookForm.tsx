import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setHookFormData } from '../../store/formSlice';
import styles from './HookForm.module.css';

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

function HookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(setHookFormData(data));
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Hook Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input type="text" {...register('name')} />
            {errors.name && <p>{errors.name.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="age">Age</label>
            <input type="number" {...register('age')} />
            {errors.age && <p>{errors.age.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register('email')} />
            {errors.email && <p>{errors.email.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p>{errors.confirmPassword.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="gender">Gender</label>
            <select {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="terms">Accept Terms and Conditions</label>
            <input type="checkbox" {...register('terms')} />
            {errors.terms && <p>{errors.terms.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="picture">Upload Picture</label>
            <input type="file" {...register('picture')} />
            {errors.picture && <p>{errors.picture.message as string}</p>}
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="country">Country</label>
            <input type="text" {...register('country')} />
            {errors.country && <p>{errors.country.message as string}</p>}
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HookForm;