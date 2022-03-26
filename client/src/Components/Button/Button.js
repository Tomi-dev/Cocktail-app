import styles from './Button.module.css';

function Button({ label, onClick }) {
  return (
    <button className={styles['btn-default']} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
