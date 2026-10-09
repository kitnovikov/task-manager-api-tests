import { expect } from "vitest";
import * as allure from "allure-js-commons";

const validateSchema = async (schema, data) => {
  try {
    return await schema.validate(data);
  } catch (e) {
    return e;
  }
};

export const expectedStatus = async (received, expected) => {
  await allure.step(`[Проверка]: Статус код ответа равен ${expected}`, () => {
    expect(received).toBe(expected);
  });
};

export const expectedSchema = async (schema, data) => {
  await allure.step(`[Проверка]: `, async () => {
    expect(await validateSchema(schema, data)).toEqual(data);
  });
};

export const expectedData = async (received, expected) => {
  expect(received).toMatchObject(expected);
};
