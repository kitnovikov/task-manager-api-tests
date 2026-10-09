import {
  generateEmail,
  generatePassword,
} from "../support/generators/user.generator.js";

export const randomCredentials = () => ({
  email: generateEmail(),
  password: generatePassword(),
});

export const emailNormalizationCases = [
  {
    condition: "Email передан в верхнем регистре",
    transform: (email) => email.toUpperCase(),
  },
  {
    condition: "Email содержит пробел в начале",
    transform: (email) => ` ${email}`,
  },
  {
    condition: "Email содержит пробел в конце",
    transform: (email) => `${email} `,
  },
  {
    condition: "Email содержит пробелы по краям",
    transform: (email) => ` ${email} `,
  },
];

export const passwordBoundaryCases = [
  {
    condition: "Длина пароля равна 8 символам",
    value: "Aa1!aaaa",
  },
  {
    condition: "Длина пароля равна 64 символам",
    value: `${"a".repeat(61)}A1!`,
  },
];

export const incorrectPasswordCases = [
  {
    condition: "Пароль неверный",
    transform: (password) => `${password}wrong`,
  },
  {
    condition: "Регистр символов пароля изменен",
    transform: (password) => password.toUpperCase(),
  },
  {
    condition: "К паролю добавлен пробел в начале",
    transform: (password) => ` ${password}`,
  },
  {
    condition: "К паролю добавлен пробел в конце",
    transform: (password) => `${password} `,
  },
];

export const invalidEmailCases = [
  { condition: "Поле отсутствует", value: undefined, omit: true },
  { condition: "Передана пустая строка", value: "" },
  { condition: "Передан null", value: null },
  { condition: "Переданы только пробелы", value: "   " },
  { condition: "Формат email некорректен", value: "invalid-email" },
  { condition: "Передано число", value: 123 },
  { condition: "Передано логическое значение", value: true },
  { condition: "Передан объект", value: {} },
  { condition: "Передан массив", value: [] },
];

export const invalidPasswordCases = [
  { condition: "Поле отсутствует", value: undefined, omit: true },
  { condition: "Передана пустая строка", value: "" },
  { condition: "Передан null", value: null },
  { condition: "Передано число", value: 123 },
  { condition: "Передано логическое значение", value: true },
  { condition: "Передан объект", value: {} },
  { condition: "Передан массив", value: [] },
];
