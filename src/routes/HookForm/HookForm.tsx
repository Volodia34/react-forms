import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { schema } from '../../validation/schema.ts';
import { toBase64 } from '../../utils/toBase64.ts';
import { setHookFormData } from '../../store/formSlice.ts';
import CountryAutocomplete from '../../components/CountryAutocomplete.tsx';
import styles from './HookForm.module.css';

export default function HookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    data.picture = await toBase64(data.picture[0]);
    dispatch(setHookFormData(data));
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>User Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              {...register('name')}
              id="name"
              placeholder="Name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              {...register('age')}
              id="age"
              placeholder="Age"
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email')}
              id="email"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password')}
              id="password"
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="gender">Gender</label>
            <select {...register('gender')} id="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="terms">Accept Terms and Conditions</label>
            <input type="checkbox" {...register('terms')} id="terms" />
            {errors.terms && <p>{errors.terms.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="picture">Upload Picture</label>
            <input type="file" {...register('picture')} id="picture" />
            {errors.picture && <p>{errors.picture.message}</p>}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="country">Country</label>
            <CountryAutocomplete register={register} name="country" />
            {errors.country && <p>{errors.country.message}</p>}
          </div>

          <button type="submit" className={styles.button} disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
