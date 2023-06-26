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
    ///events?start=2006-01-02T15:04:05Z&stop=2006-01-02T15:04:05Z
    return fetch (this._url + `/events?start=${periodTime.startDate}T${periodTime.startTime}Z&stop=${periodTime.endDate}T${periodTime.endTime}Z`, {
      method: 'GET', 
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addEvent(data) { 
    ///events?name=dummy&start=2006-01-02T15:04:05Z&stop=2006-01-02T15:05:05Z
    return fetch (this._url + `/events?name=${data.name}&start=${data.startDate}T${data.startTime}Z&stop=${data.endDate}T${data.endTime}Z`, {
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
  url: 'https://mycalendar.space',
  headers: {
    "Content-Type": "application/json"
  }
});

export default mainApi;