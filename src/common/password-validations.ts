export const hasAnyUpperCase = (password: string) => /[A-Z]/.test(password);
export const hasAnyLowerCase = (password: string) => /[a-z]/.test(password);
export const hasAnyNumber = (password: string) => /[0-9]/.test(password);
export const hasAnySymbol = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password);
export const isGreatherOrEqualThanEight = (password: string) =>
  password.length >= 8;
