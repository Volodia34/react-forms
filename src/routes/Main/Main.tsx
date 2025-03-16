import { Link } from 'react-router-dom';
import styles from './Main.module.css';

function Main() {
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
      </div>
    </div>
  );
}

export default Main;
