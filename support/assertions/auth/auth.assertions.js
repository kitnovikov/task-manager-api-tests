import { expect } from "vitest";
// import {parseSetCookie} from "cookie";
import {
  expectedData,
  expectedSchema,
  expectedStatus,
} from "../common/asserts.js";
import { tokensSchema } from "../../../domains/auth/schemas/tokens.schema.js";
import { decodeJwt } from "../../../src/utils.js";
import AuthError from "../../../domains/auth/errors/auth.error.js";

export async function expectSuccessfulLogin(response) {
  await expectedStatus(response.status, 200);
  await expectedSchema(tokensSchema, response.data);

  const { accessToken, refreshToken } = response.data;

  expectJwtToken(accessToken);
  expectJwtToken(refreshToken);
}

export function expectJwtToken(token) {
  const payload = decodeJwt(token);

  expect(payload).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    }),
  );

  expect(payload).not.toHaveProperty("password");
  expect(payload.exp).toBeGreaterThan(payload.iat);
}

// export function expectRefreshTokenCookie(response) {
//     const setCookieHeaders = response.headers['set-cookie']
//
//     expect(Array.isArray(setCookieHeaders)).toBe(true)
//
//     const refreshTokenCookie = setCookieHeaders.find((value) => value.startsWith('refreshToken='))
//     expect(refreshTokenCookie).toBeDefined()
//
//     const cookie = parseSetCookie(refreshTokenCookie)
//
//     expect(cookie).toEqual(expect.objectContaining({
//         name: 'refreshToken',
//         value: response.data.refreshToken,
//         httpOnly: true,
//         maxAge: 2592000,
//     }))
// }

export async function expectIncorrectCredentials(response) {
  await expectedStatus(response.status, 400);
  await expectedSchema(response.data, AuthError.invalidCredentialsError);
  await expectedData(response.data, AuthError.invalidCredentialsError);
}
