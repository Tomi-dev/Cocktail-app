import styles from './Card.module.css';

function Card({ children, externalClass, onClick }) {
  return (
    <div
      className={`${styles['wrapper-card']} ${externalClass}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
