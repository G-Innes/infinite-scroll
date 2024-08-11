import React from 'react';
import styles from './TextCard.module.css';

interface TextCardProps {
  title: string;
}

const TextCard: React.FC<TextCardProps> = ({ title }) => {
  return (
    <div className={styles.textCard}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default TextCard;
