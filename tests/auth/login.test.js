import { beforeAll, describe, test, suite } from "vitest";
import AuthWorkflow from "../../application/workflows/auth.workflow.js";
import {
    expectIncorrectCredentials,
    expectSuccessfulLogin,
} from "../../support/assertions/auth/auth.assertions.js";
import {createApi} from "../../support/factory/context.js";
import {randomCredentials} from "../../fixtures/login.cases.js";
import {generateEmail, generatePassword} from "../../support/generators/user.generator.js";
import LoginDto from "../../dto/login.dto.js";

describe('Авторизация', () => {
    let api, authWorkflow, registeredNotVerificationUser

    beforeAll(async () => {
        api = createApi().api
        authWorkflow = new AuthWorkflow(api)
        registeredNotVerificationUser = await authWorkflow.registerUser()
    })

    suite('Бизнес-логика входа и состояния пользователя', () => {
        test.todo('Авторизация. Успешный вход пользователя. Корректные email и пароль', async () => {
            const credentials = new LoginDto({
                email: registeredNotVerificationUser.email,
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Успешный вход пользователя. Email не подтверждён', async () => {
            const credentials = new LoginDto({
                email: registeredNotVerificationUser.email,
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Отказ во входе пользователя. Email отсутствует в базе', async () => {
            const credentials = randomCredentials()

            const response = await api.auth.login(credentials)

            await expectIncorrectCredentials(response)
        })

        test('Авторизация. Отказ во входе пользователя. Пароль не соответствует аккаунту', async () => {
            const credentials = new LoginDto({
                email: registeredNotVerificationUser.email,
                password: generatePassword(),
            })

            const response = await api.auth.login(credentials)

            await expectIncorrectCredentials(response)
        })

        test('Авторизация. Проверка неразличимости ошибок входа. Сравниваются неизвестный email и неверный пароль', async () => {
            const randomPassword = generatePassword()

            const firstResponse = await api.auth.login(new LoginDto({
                email: registeredNotVerificationUser.email,
                password: randomPassword,
            }))

            const secondResponse = await api.auth.login(new LoginDto({
                email: generateEmail(),
                password: randomPassword,
            }))

            await expectIncorrectCredentials(firstResponse)
            await expectIncorrectCredentials(secondResponse)
        })

        test.todo('Авторизация. Проверка входа архивного пользователя. Аккаунт имеет статус Archived', async () => {

        })
    })

    suite('Нормализация email и выбор аккаунта', () => {
        test('Авторизация. Нормализация регистра email. Адрес передан заглавными буквами', async () => {
            const credentials = new LoginDto({
                email: registeredNotVerificationUser.email.toUpperCase(),
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Удаление начальных пробелов email. Перед адресом добавлен пробел', async () => {
            const credentials = new LoginDto({
                email: ` ${registeredNotVerificationUser.email}`,
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Удаление начальных пробелов email. После адреса добавлен пробел', async () => {
            const credentials = new LoginDto({
                email: `${registeredNotVerificationUser.email} `,
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Совместная нормализация email. Изменён регистр и добавлены пробельные символы', async () => {
            const credentials = new LoginDto({
                email: `\t${registeredNotVerificationUser.email.toUpperCase()}\n`,
                password: registeredNotVerificationUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Проверка раздельности аккаунтов. Email отличаются наличием точки', async () => {
            const firstUser = await authWorkflow.registerUser({ email: 'qa.dot@example.com' })
            const secondUser = await authWorkflow.registerUser({ email: 'qadot@example.com' })
            const credentials = new LoginDto({
                email: firstUser.email,
                password: secondUser.password,
            })

            const response = await api.auth.login(credentials)

            await expectIncorrectCredentials(response)
        })

        test('Авторизация. Проверка идентичности email. Латинская буква заменена похожей кириллической', async () => {
            const user = await authWorkflow.registerUser({ email: 'qa.login@example.com' })
            const credentials = new LoginDto({
                email: 'qа.login@example.com',
                password: user.password,
            })

            const response = await api.auth.login(credentials)

            await expectIncorrectCredentials(response)
        })
    })

    suite('Точность сравнения пароля', () => {
        test('Авторизация. Проверка чувствительности пароля к регистру. Изменён регистр одной буквы', async () => {
            const password = registeredNotVerificationUser.password
            const incorrectPassword = password.at(0).toUpperCase().concat(password.slice(1))
            const credentials = new LoginDto({
                email: registeredNotVerificationUser.email,
                password: incorrectPassword,
            })

            const response = await api.auth.login(credentials)

            await expectIncorrectCredentials(response)
        })

        test('Авторизация. Сохранение начального пробела пароля. Пробел является частью сохранённого значения', async () => {
            const user = await authWorkflow.registerUser({ password: ' '.concat(generatePassword()) })
            const credentials = new LoginDto({
                email: user.email,
                password: user.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test('Авторизация. Сохранение конечного пробельного символа пароля. Табуляция является частью сохранённого значения', async () => {
            const user = await authWorkflow.registerUser({ password: generatePassword().concat('\t') })
            const credentials = new LoginDto({
                email: user.email,
                password: user.password,
            })

            const response = await api.auth.login(credentials)

            await expectSuccessfulLogin(response)
        })

        test.todo('Авторизация. Сохранение конечного пробельного символа пароля. Табуляция является частью сохранённого значения', async () => {

        })
    })
})
