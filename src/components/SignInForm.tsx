import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { emailRegex, passwordRegex } from "@utils/regex";
import { useMemo } from "react";
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
import forgotPWButton from "@assets/img/forgotPWButton.png";
import FormInput from "./FormInput";

export type LoginInputs = { email: string; password: string };

const SignInForm = () => {
  const { useLoginMutate } = useAuthMutation();
  const { mutate: onLogin } = useLoginMutate();
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { isValid },
  } = useForm<LoginInputs>();
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

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;
    if (isValid) {
      onLogin({ email, password });
    }

    resetField("email");
    resetField("password");
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
        <p className={styles.say}>Please Sign-in!</p>
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
          <button>
            <img src={signupButton} alt="signup" />
          </button>
          <button>
            <img src={forgotPWButton} alt="forgotPW" />
          </button>
        </div>
      </form>
      <div className={styles.snsArea}>
        <img className={styles.snsButton} src={kakaoButton} alt="kakao" />
        <img className={styles.snsButton} src={naverButton} alt="naver" />
        <img className={styles.snsButton} src={googleButton} alt="google" />
      </div>
    </div>
  );
};
export default SignInForm;
