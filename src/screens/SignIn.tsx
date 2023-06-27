import React from "react";
import SignInForm from "components/SignInForm";
import styles from "styles/styles.module.scss";

const SignIn = () => {
  return (
    <div className={styles.signin}>
      <SignInForm />
    </div>
  );
};

export default SignIn;
