import { useState, useEffect } from 'react';

import styles from './Input.module.css';

function Input({
  type,
  label,
  name,
  id,
  placeholder,
  value = '',
  onChange,
  onKeyUp,
  onKeyDown,
}) {
  const [isFocused, setIsFocused] = useState();

  const handleFocus = (e) => {
    setIsFocused(true);
  };

  const hanldeBlur = (e) => {
    if (!value.trim()) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (placeholder) {
      setIsFocused(true);
    }
  }, []);

  return (
    <div className={styles['form-control']}>
      {label && id && (
        <label
          className={isFocused || placeholder ? styles['label-animated'] : ''}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={hanldeBlur}
      />
    </div>
  );
}

export default Input;
