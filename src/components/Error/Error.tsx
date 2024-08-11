import React from 'react';
import styles from './Error.module.css';
import { isError } from '../../types/error';

interface ErrorProps {
  error: unknown;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const errorMessage = isError(error)
    ? error.message
    : 'An unknown error occurred';
  return <p className={styles.error}>Error: {errorMessage}</p>;
};

export default Error;
