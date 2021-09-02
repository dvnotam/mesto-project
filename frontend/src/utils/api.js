class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus (id, isLiked) {
        console.log(id, isLiked, '---> cl')
        return isLiked ? this.deleteLike(id) : this.addLike(id);
    }

    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
};

export const api = () => {
    const token = localStorage.getItem('token') || ''

    return new Api({
        baseUrl: 'https://dv.frontend.nomoredomains.rocks/',
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        }
    });
}

export default api()