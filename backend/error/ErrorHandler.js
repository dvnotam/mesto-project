// eslint-disable-next-line max-classes-per-file
const errType = {
  user: 'user',
  auth: 'auth',
  card: 'card',
  global: 'global',
};

class NetworkError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

class ErrorHandler {
  constructor(type, code = 500) {
    this.code = code;
    this.defaultError = 'Ошибка сервера';

    switch (type) {
      case errType.user:
        return this._userError();
      case errType.auth:
        return this._authError();
      case errType.card:
        return this._cardError();
      case errType.global:
        return this._globalError();
      default:
        return this._error(this.defaultError);
    }
  }

  _userError() {
    switch (this.code) {
      case 400:
        return this._error('Переданны некоректные данные');
      case 401:
        return this._error('Неверный email или password');
      case 404:
        return this._error('Пользователь не найден');
      case 409:
        return this._error('Такой email уже существует');
      default:
        return this._error('Ошибка сервера');
    }
  }

  _authError() {
    switch (this.code) {
      case 400:
        return this._error('Переданны некоректные данные');
      case 401:
        return this._error('Вы не авторизованны');
      default:
        return this._error('Ошибка сервера');
    }
  }

  _cardError() {
    switch (this.code) {
      case 400:
        return this._error('Переданны некоректные данные');
      case 403:
        return this._error('Невозможно удалить карточку другого пользлвателя');
      case 404:
        return this._error('Карта с указанным id не найдена');
      default:
        return this._error('Ошибка сервера');
    }
  }

  _globalError() {
    switch (this.code) {
      case 404:
        return this._error('Запрос не найден');
      default:
        return this._error('Ошибка сервера');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _error(message) {
    return new NetworkError(message, this.code);
  }
}

module.exports = { ErrorHandler, errType };
