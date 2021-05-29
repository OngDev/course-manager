/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export default function FormItem({
  error,
  placeholder,
  inputId,
  name,
  labelName,
  type,
  isFirstVisit,
  register
}) {
  const [data, setData] = useState('');
  const [computedClassName, setComputedClassName] = useState('');

  useEffect(() => {
    if (!isFirstVisit) {
      setComputedClassName(error ? styles.errorInput : styles.validInput);
    }
  }, [error]);

  return (
    <div className={styles.formItem}>
      <label htmlFor={inputId}> {labelName}:</label>
      <input
        placeholder={placeholder}
        id={inputId}
        {...register}
        name={name}
        type={type}
        className={computedClassName}
        value={data}
        onChange={e => {
          e.preventDefault();
          setData(e.target.value);
        }}
      />
      {error && error.message && (
        <span className={styles.errorMessage}>{error.message}</span>
      )}
    </div>
  );
}
