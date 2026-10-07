import { Faker, ru } from "@faker-js/faker"

const faker = new Faker({ locale: ru })

export function generateFirstName() {
    return faker.person.firstName()
}

export function generateLastName() {
    return faker.person.lastName()
}

export function generateEmail() {
    return `user-${faker.string.uuid()}@example.com`
}

export function generatePassword() {
    return faker.helpers.fromRegExp(/[a-z]{3}[A-Z]{1}[0-9]{2}[!@#$%^&*(),.?":{}|<>+=_-]{8}/)
}
