import {generateEmail, generateFirstName, generateLastName, generatePassword} from "../../support/generators/user.generator.js";

export default class UserBuilder {
    static build(data = {}) {
        return {
            firstName: generateFirstName(),
            lastName: generateLastName(),
            email: generateEmail(),
            password: generatePassword(),
            ...data,
        }
    }
}