import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { emailRegex, passwordRegex } from "@utils/regex";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@styles/styles.module.scss";
import robot from "@assets/img/robot.png";
import speechBubble from "@assets/img/speechBubble.png";
import onSigninButton from "@assets/img/onSigninButton.png";
import offSigninButton from "@assets/img/offSigninButton.png";
import kakaoButton from "@assets/img/kakaoButton.png";
import naverButton from "@assets/img/naverButton.png";
import googleButton from "@assets/img/googleButton.png";
import signupButton from "@assets/img/signupButton.png";
import forgotPwButton from "@assets/img/forgotPwButton.png";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

export type SignInInputs = { email: string; password: string };

const SignInForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { useSignInMutate } = useAuthMutation();
  const { mutate: signin, isLoading } = useSignInMutate({
    onError: (message) => {
      setErrorMsg(message);
    },
  });

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { isValid },
  } = useForm<SignInInputs>();
  const emailInput = watch("email");
  const passwordInput = watch("password");

  const emailIsValid = useMemo(
    () => (!emailInput ? null : emailRegex(emailInput)),
    [emailInput]
  );
  const passwordIsValid = useMemo(
    () => (!passwordInput ? null : passwordRegex(passwordInput)),
    [passwordInput]
  );

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const { email, password } = data;
    if (isValid) {
      signin({ email, password });
    }

    resetField("email");
    resetField("password");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onForgotPwClick = () => {
    navigate("/user/forgot-pw");
  };

  return (
    <div className={styles.signin__form}>
      <div className={styles.sayRobot}>
        <img
          className={styles.speechBubble}
          src={speechBubble}
          alt="speechBubble"
        />
        <img className={styles.robot} src={robot} alt="robot" />
        <p className={styles.say}>
          {isLoading
            ? "Now Loading..."
            : errorMsg === ""
            ? "Please Sign-In..!"
            : errorMsg}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 컴포넌트로 제작 예정 */}
        <FormInput
          label="Email"
          type="email"
          {...register("email")}
          isValid={emailIsValid}
          errorMessage="Is out of format"
          {...register("email", {
            required: true,
            validate: (value) => emailRegex(value),
          })}
        />
        <FormInput
          label="Password"
          type="password"
          {...register("password")}
          isValid={passwordIsValid}
          errorMessage="Plz 6 digits or more"
          {...register("password", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />

        <button type="submit">
          {isValid ? (
            <img
              className={styles.signinButton}
              src={onSigninButton}
              alt="signin"
            />
          ) : (
            <img
              className={styles.signinButton}
              src={offSigninButton}
              alt="signin"
            />
          )}
        </button>
        <div className={styles.signupArea}>
          <button onClick={onSignUpClick}>
            <img src={signupButton} alt="signup" />
          </button>
          <button onClick={onForgotPwClick}>
            <img src={forgotPwButton} alt="forgotPW" />
          </button>
        </div>
      </form>
      <div className={styles.snsArea}>
        <button>
          <img className={styles.snsButton} src={kakaoButton} alt="kakao" />
        </button>
        <button>
          <img className={styles.snsButton} src={naverButton} alt="naver" />
        </button>
        <button>
          <img className={styles.snsButton} src={googleButton} alt="google" />
        </button>
      </div>
    </div>
  );
};
export default SignInForm;
