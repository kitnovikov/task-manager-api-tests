// СОЗДАНИЕ РАБОЧЕГО ПРОСТРАНСТВА

// Создать рабочее пространство, если не авторизован
// Создать рабочее пространство, если не прошел верификацию
// Создать рабочее пространство, если залогинелся, но удалил аккаунт
// Создать рабочее пространство, если аккаунт в статусе Archived

// Создать рабочее пространство, если аккаунт верифицирован и данные корректны
// Создать рабочее пространство, если поля не корректные
// Создать рабочее пространство, если ключ уже существует

// Создать рабочее пространство, если token истекший
// Создать рабочее пространство, если токен не корректный

import ConfigService from "../../config/config.service.js";
import HttpClient from "../../infrastructure/http/http.client.js";
import {describe, expect, test} from "vitest";
import API from "../../interfaces/api/api.js";

const config = new ConfigService()
const client = new HttpClient(config)
const api = new API(client)

describe('Рабочее пространство', () => {
    test('Создать рабочее пространство. Нет Authorization', async () => {
        const body = {}

        const response = await api.workspace.createWorkspace(body)

        expect(response.status).toBe(401)
    })
})

