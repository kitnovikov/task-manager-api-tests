import UserBuilder from "../builders/user.builder.js";
import { expectedStatus } from "../../support/assertions/common/asserts.js";
import * as allure from "allure-js-commons";

export default class AuthWorkflow {
  constructor(api) {
    this.api = api;
  }

  async registerUser(data = {}) {
    return allure.step("Создать неверефицированного пользователя", async () => {
      const request = UserBuilder.build(data);
      const response = await this.api.auth.registration(request);

      await expectedStatus(response.status, 201);

      return Object.assign({}, request, response.data);
    });
  }

  async registerVerificationUser() {
    const { request } = await this.registerUser();
    await this.verifyEmail();
  }

  async verifyEmail(email) {}
}
