import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import styles from './Main.module.css';

function Main() {
  const { uncontrolledForm, hookForm } = useSelector(
    (state: RootState) => state.form
  );
  const [newData, setNewData] = useState<'uncontrolled' | 'hook' | null>(null);

  useEffect(() => {
    if (uncontrolledForm || hookForm) {
      setNewData(uncontrolledForm ? 'uncontrolled' : 'hook');
      const timer = setTimeout(() => setNewData(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [uncontrolledForm, hookForm]);

  const renderFormData = (data: any) => (
    <div className={styles.dataTile}>
      <h3>{data.name}</h3>
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Country:</strong> {data.country}</p>
      <p><strong>Terms Accepted:</strong> {data.terms ? 'Yes' : 'No'}</p>
      <img src={data.picture} alt="Uploaded" className={styles.picture} />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Forms Showcase</h1>
        <p className={styles.description}>Please select a form type below:</p>

        <nav className={styles.nav}>
          <Link className={styles.btn} to="/uncontrolled-form">
            Uncontrolled Form
          </Link>
          <Link className={styles.btn} to="/hook-form">
            Hook Form
          </Link>
        </nav>

        <div className={styles.data}>
          {uncontrolledForm && (
            <div
              className={`${styles.tile} ${
                newData === 'uncontrolled' ? styles.newData : ''
              }`}
            >
              <h2>Uncontrolled Form Data</h2>
              {renderFormData(uncontrolledForm)}
            </div>
          )}
          {hookForm && (
            <div
              className={`${styles.tile} ${
                newData === 'hook' ? styles.newData : ''
              }`}
            >
              <h2>Hook Form Data</h2>
              {renderFormData(hookForm)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;