import SignUpForm from "@components/form/SignUpForm";
import styles from "@styles/styles.module.scss";

const SignUp = () => {
  return (
    <>
      <div className={styles.signin}>
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;
