const EMAIL_REGEX = /^\S+@\S+$/i;
const PASSWORD_REGEX = /^.{6,}$/;
const NICKNAME_REGEX = /[ \{\}\[\]\/?.,;:|\)*~`!^\+┼<>@\#$%&\'\"\\\(\=]/gi;
const NAME_REGEX = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

export const emailRegex = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const passwordRegex = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const nicknameRegex = (nickname: string): boolean => {
  return NICKNAME_REGEX.test(nickname);
};

export const nameRegex = (name: string): boolean => {
  return NAME_REGEX.test(name);
};
