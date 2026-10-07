import BaseApi from "./base.api.js";
import * as allure from "allure-js-commons";

export default class AuthApi extends BaseApi {
    async registration(data) {
        return allure.step('Зарегестрироваться', async () => {
            return this.client.post('/api/auth/registration', data)
        })
    }

    async login(data) {
        return allure.step('Авторизоваться', async () => {
            return this.client.post('/api/auth/login', data)
        })
    }
}