import styles from "./Card.module.css";

const Card = ({ cardData, title }) => {
  if (Object.entries(cardData).length === 0) return null;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {Object.entries(cardData).map(([k, v]) => (
        <div className={styles.cell} key={k}>
          <div className={styles.value}>{k}</div>
          <div className={styles.value}>{v}</div>
        </div>
      ))}
    </div>
  );
};

export default Card;
