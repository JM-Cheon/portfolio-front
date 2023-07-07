import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { emailRegex, passwordRegex } from "@utils/regex";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "@styles/styles.module.scss";
import robot from "@assets/img/robot.png";
import speechBubble from "@assets/img/speechBubble.png";
import onSignupButton from "@assets/img/onSignupButton.png";
import offSignupButton from "@assets/img/offSignupButton.png";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";

export type SignUpInputs = {
  email: string;
  password: string;
  validPassword: string;
  nickname: string;
  name: string;
  birth: string;
};

const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { useSignUpMutate } = useAuthMutation();
  const { mutate: signup, isLoading } = useSignUpMutate({
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
  } = useForm<SignUpInputs>();

  const emailInput = watch("email");
  const passwordInput = watch("password");
  const validPasswordInput = watch("validPassword");
  const nicknameInput = watch("nickname");
  const nameInput = watch("name");
  const birthInput = watch("birth");

  const emailIsValid = useMemo(
    () => (!emailInput ? null : emailRegex(emailInput)),
    [emailInput]
  );
  const passwordIsValid = useMemo(
    () => (!passwordInput ? null : passwordRegex(passwordInput)),
    [passwordInput]
  );
  const validPasswordIsValid = useMemo(
    () => (!validPasswordInput ? null : passwordInput === validPasswordInput),
    [passwordInput, validPasswordInput]
  );

  // 수정
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const { email, password } = data;
    if (isValid) {
      signup({ email, password });
    }
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
            ? "Please Sign-Up..!"
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
        <FormInput
          label="Valid-Password"
          type="password"
          {...register("validPassword")}
          isValid={validPasswordIsValid}
          errorMessage="Password is different"
          {...register("validPassword", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />
        <FormInput
          label="Nickname"
          type="text"
          {...register("nickname")}
          isValid={emailIsValid}
          errorMessage="Plz 6 digits or more"
          {...register("nickname", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />
        <FormInput
          label="Name"
          type="text"
          {...register("name")}
          isValid={emailIsValid}
          errorMessage="Plz 6 digits or more"
          {...register("name", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />
        <FormInput
          label="Birth"
          type="text"
          {...register("birth")}
          isValid={emailIsValid}
          errorMessage="Plz 6 digits or more"
          {...register("birth", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />

        <button type="submit">
          {isValid ? (
            <img
              className={styles.signinButton}
              src={onSignupButton}
              alt="signin"
            />
          ) : (
            <img
              className={styles.signinButton}
              src={offSignupButton}
              alt="signin"
            />
          )}
        </button>
      </form>
    </div>
  );
};
export default SignUpForm;
