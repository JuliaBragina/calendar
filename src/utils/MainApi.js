class MainApi { 
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res);
  }

  register( name, login, pass ) {
    return fetch (this._url + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, login, pass })
    }).then(this._checkResponse);
  };

  login( login, pass ) {
    return fetch(this._url + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ login, pass })
    }).then(this._checkResponse);
  };

  getMe() {
    return fetch(this._url + '/user', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };

  logout() {
    return fetch(this._url + '/signout', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };
}

const mainApi = new MainApi({
  url: '/api',
  headers: {
    "Content-Type": "application/json"
  }
});

export default mainApi;