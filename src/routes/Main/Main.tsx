import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import styles from './Main.module.css';

function Main() {
  const { uncontrolledForm, hookForm } = useSelector(
    (state: RootState) => state.form
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
            <div className={styles.tile}>
              <h2>Uncontrolled Form Data</h2>
              <pre>{JSON.stringify(uncontrolledForm, null, 2)}</pre>
            </div>
          )}
          {hookForm && (
            <div className={styles.tile}>
              <h2>Hook Form Data</h2>
              <pre>{JSON.stringify(hookForm, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
