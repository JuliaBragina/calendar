class EventsApi { 
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }

  getAllEvents(periodTime) {
    return fetch (this._url + periodTime, {
      method: 'GET', 
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addEvent(data) { 
    return fetch (this._url + data, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deletEvent(eventId) {
    //events?id=7
    return fetch (this._url + `/events?id=${eventId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}


const mainApi = new EventsApi({
  url: '/api',
  headers: {
    "Content-Type": "application/json"
  }
});

export default mainApi;