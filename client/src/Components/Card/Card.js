import styles from './Card.module.css';

function Card({ children, externalClass }) {
  return (
    <div className={`${styles['wrapper-card']} ${externalClass}`}>
      {children}
    </div>
  );
}

export default Card;
