import React from "react";
import styles from "@styles/styles.module.scss";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isValid: boolean | null;
  errorMessage: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, isValid, errorMessage, ...otherProps }, ref) => {
    return (
      <div className={styles.formInput}>
        <div>
          <label htmlFor={label}>{label}</label>
          {isValid === false && <span>{errorMessage}</span>}
        </div>
        <input {...otherProps} ref={ref} />
      </div>
    );
  }
);

export default FormInput;
