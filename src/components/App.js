import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import AddEventPopup from './AddEventPopup';
import eventsApi from '../utils/EventsApi';
import mainApi from '../utils/MainApi';
import ProtectedRoute from './ProtectedRoute'
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import consistentTypeSpecifierStyle from 'eslint-plugin-import/lib/rules/consistent-type-specifier-style';

function App() {  
  let now = new Date();
  const [isCurrentWeek, setCurrentWeek] = useState([]);
  const [isAddEvent, setAddEvent] = useState(false);
  const [isDeleteEvent, setDeleteEvent] = useState(false);
  const [isEvents, setEvents] = useState([]);
  const [choosenEvent, setChoosenEvent] = useState({});
  const [numberChoosenEvent, setNumberChoosenEvent] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [currenUser, setCurrentUser] = useState({});  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn').toLowerCase() === 'true' : false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentWeek(getCurrentWeek(now.getDay(), now));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getMe()
        .then(user => {
          setCurrentUser(user);
          getEvents();
        })
        .catch(err => console.log('err'));
    } else {
      navigate('/sign-in');
      setCurrentUser({});
      setCurrentWeek({});
      localStorage.clear();
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(isEvents));
  }, [isEvents]);

  useEffect(() => {
    if(isCurrentWeek.length !== 0 && loggedIn) {
      getEvents();
    }
  }, [isCurrentWeek]);

  function getEvents() {
    let dateStart = new Date(isCurrentWeek[0]);
    let dateEnd = new Date(isCurrentWeek[6]);
    const periodTime = {
      startDate: dateStart.toISOString().split('T')[0],
      startTime: '00:00:01',
      endDate: dateEnd.toISOString().split('T')[0],
      endTime: '23:59:59'
    }
    eventsApi.getAllEvents(periodTime)
    .then((events) => {
      setEvents(checkTimeZone(events));
      localStorage.setItem('events', JSON.stringify(events));
    })
    .catch((err) => alert(err));
  }

  function checkTimeZone(events) {
    events.map((event) => {
      event.start = new Date(event.start);
      event.stop = new Date(event.stop);
    });
    return (events);
  }

  function getCurrentWeek(nowDayNumber, nowDay) {
    const massDays = [];
    for(let i = 0; i < nowDayNumber; i++) {
      massDays.push(addDays(i - nowDayNumber, nowDay));
    }
    for(let i = 0; i < 7 - nowDayNumber; i++) {
      massDays.push(addDays(i, nowDay));
    }
    return massDays;
  }

  function addDays(days, currentDay) {
    let date = new Date(currentDay);
    date.setDate(date.getDate() + days);
    return date;
  }

  function handlerAddEventOpen() {
    setAddEvent(true);
  }

  function handlerCancelEventClose() {
    setAddEvent(false);
  }

  function handlerChooseEvent(event, i) {
    setChoosenEvent(event);
    setNumberChoosenEvent(i);
    setDeleteEvent(true);
  }

  function handleDeleteEvent(status) {
    if(status) {
      eventsApi.deletEvent(choosenEvent[numberChoosenEvent].id)
      .then(() => {
        setEvents(events => events.filter(event => event.id != choosenEvent[numberChoosenEvent].id));
        setDeleteEvent(false);
      })
      .catch(err => alert(err));
    }
  }

  function handlerAddEvent(event) {
    console.log(event);

    let eventTimeZoneStart = new Date(event.eventDayStart + 'T' + event.eventTimeStart + ':00');
    let eventTimeZoneStop = new Date(event.eventDayStart + 'T' + event.eventTimeStop + ':00');

    let myStartDate = new Date(eventTimeZoneStart).toISOString();
    let myStopDate = new Date(eventTimeZoneStop).toISOString();

    let newEvent = `/events?name=${event.eventText}&start=${myStartDate.split('.')[0]}Z&stop=${myStopDate.split('.')[0]}Z`;

    eventsApi.addEvent(newEvent)
    .then((newEvent) => {
      //setEvents([newEvent, ...isEvents]);
      getEvents();
      setAddEvent(false);
    })
    .catch(err => alert(err))
  }

  function handleLoginUser(data) {
    mainApi.login(data.login, data.pass)
    .then((newUser) => {
      if (newUser) {
        setLoggedIn(true);
        setCurrentWeek(getCurrentWeek(now.getDay(), now));
        localStorage.setItem("loggedIn", true);
        navigate('/');
      } else {
        alert('токена нет');
        setLoggedIn(false);
        localStorage.setItem("loggedIn", false)
        setCurrentWeek({});
      }
    })
    .catch((err) => alert(err));
  }
  
  function handleRegisterUser(data) {
    mainApi.register(data.name, data.login, data.pass)
    .then(() => {
      mainApi.getMe()
      .then((user) => handleLoginUser(data))
      .catch((err) => alert(err))
    })
    .catch((err) => alert(err));
  }

  function handlerLogOut() {
    mainApi.logout()
    .then((res) => {
      navigate('/sign-in');
      setLoggedIn(false);
      setCurrentUser({});
      setCurrentWeek({});
      localStorage.clear();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function setPrevWeek() {
    setCurrentWeek(isCurrentWeek.map(day => addDays(-7, day)));
  }

  function setNextWeek() {
    setCurrentWeek(isCurrentWeek.map(day => addDays(7, day)));
  }
  //<Route element={<ProtectedRoute loggedIn={loggedIn} />}></Route>

  return (
    <CurrenUserContext.Provider value={currenUser}>
      <div className="app">
        <Routes>
          <Route path='/' element={(
            <>
              <Header onEddEvent={handlerAddEventOpen} onLogOut={handlerLogOut} />
              <Main
                onDeleteEvent={handlerChooseEvent}
                currentDay={now.getDate()}
                currentWeek={isCurrentWeek}
                events={isEvents}
                onSetPrevWeek={setPrevWeek}
                onSetNextWeek={setNextWeek} />
              <Footer onDeleteEventFooter={handleDeleteEvent} isShowDeleteButton={isDeleteEvent} />
            </>)}>
          </Route>

          <Route path='/sign-in' element={<Login onLoginUser={handleLoginUser} onLoading={isLoading} />}></Route>
          <Route path='/sign-up' element={<Register onRegisterUser={handleRegisterUser} />}></Route>

        </Routes>

        <AddEventPopup onClose={handlerCancelEventClose} onAddEvent={handlerAddEvent} isOpen={isAddEvent}/>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
