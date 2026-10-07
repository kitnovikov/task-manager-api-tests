export default class AuthError {
    static invalidCredentialsError = {
        statusCode: 400,
        error: 'BadRequestError',
        message: 'Неверный email или пароль',
    }

    static userNotFoundError = {
        statusCode: 404,
        error: 'NotFoundError',
        message: 'Пользователь не найден',
    }

    static validationError = {
        statusCode: 400,
        error: 'ValidationError',
    }
}