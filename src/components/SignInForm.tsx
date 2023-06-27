import useAuthMutation from "hooks/mutations/useAuthMutation";
import { emailRegex, passwordRegex } from "utils/regex";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "styles/styles.module.scss";
import robot from "assets/robot.png";

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
    console.log(isValid);
    const { email, password } = data;
    if (isValid) {
      onLogin({ email, password });
    }

    resetField("email");
    resetField("password");
  };

  return (
    <div className={styles.signin__form}>
      <img src={robot} alt="robot" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 컴포넌트로 제작 예정 */}
        <input
          //   label="Email"
          type="email"
          {...register("email")}
          //   isValid={emailIsValid}
          //   errorMessage="이메일 형식에 맞지 않습니다."
          //   {...register("email", {
          //     required: true,
          //     validate: (value) => emailRegex(value),
          //   })}
        />
        <input
          //   label="Password"
          type="password"
          {...register("password")}
          //   isValid={passwordIsValid}
          //   errorMessage="8자리 이상 비밀번호를 사용하세요."
          //   {...register("password", {
          //     required: true,
          //     validate: (value) => passwordRegex(value),
          //   })}
        />
        <button type="submit">
          {isValid ? "Sign In" : <span>&#10005;</span>}
        </button>
      </form>
    </div>
  );
};
export default SignInForm;
