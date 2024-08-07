import React from 'react';
import styles from './Error.module.css';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <p className={styles.error}>Error: {message}</p>;
};

export default Error;
