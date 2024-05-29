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
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn').toLowerCase() == 'true' : false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentWeek(getCurrentWeek(now.getDay(), now));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getMe()
        .then(user => {
          if(user) {
            setCurrentUser(user);
          }
        })
        .catch(err => setLoggedIn(false));
    } else {
      navigate('/sign-in');
      setCurrentUser({});
      setCurrentWeek({});
      setLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn && currenUser && isCurrentWeek.length !== 0) {
      getEvents();
    }
  }, [loggedIn])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(isEvents));
  }, [isEvents]);

  useEffect(() => {
    if(isCurrentWeek.length !== 0 && loggedIn) {
      getEvents();
    }
  }, [isCurrentWeek]);

  function getEvents() {
    const periodTime = {
      startTime: '00:00:01',
      endTime: '23:59:59'
    }
    let time = `/events?start=${isCurrentWeek[0].toISOString().split('T')[0]}T${periodTime.startTime}Z&stop=${isCurrentWeek[6].toISOString().split('T')[0]}T${periodTime.endTime}Z`;
    eventsApi.getAllEvents(time)
    .then((events) => {
      if(events.length !== 0) {
        setEvents(checkTimeZone(events));
        localStorage.setItem('events', JSON.stringify(events));
      }
    })
    .catch((err) => console.log(err));
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
      .catch(err => {
        alert(err);
        alert('130');
      });
    }
  }

  function handlerAddEvent(event) {
    let eventTimeZoneStart = new Date(event.eventDayStart + 'T' + event.eventTimeStart + ':00');
    let eventTimeZoneStop = new Date(event.eventDayStart + 'T' + event.eventTimeStop + ':00');

    let myStartDate = new Date(eventTimeZoneStart).toISOString();
    let myStopDate = new Date(eventTimeZoneStop).toISOString();

    let newEvent = `/events?name=${event.eventText}&start=${myStartDate.split('.')[0]}Z&stop=${myStopDate.split('.')[0]}Z`;

    eventsApi.addEvent(newEvent)
    .then((newEvent) => {
      getEvents();
      setAddEvent(false);
    })
    .catch(err =>{
      alert(err);
      alert('150');
    })
  }

  function handleLoginUser(data) {
    mainApi.login(data.login, data.pass)
    .then((newUser) => {
      if(newUser) {
        setLoggedIn(true);
        setCurrentWeek(getCurrentWeek(now.getDay(), now));
        localStorage.setItem("loggedIn", true);
        navigate('/');
      } else {
        handleError('токена нет');
      }
    })
    .catch((err) => {
      alert(err);
      alert('170');
    });
  }
  
  function handleRegisterUser(data) {
    mainApi.register(data.name, data.login, data.pass)
      .then((newUser) => {
        if (newUser) {
          handleLoginUser(data);
        } else {
          handleError('токена нет');
        }
      })
      .catch((err) => {
        alert(err);
        alert('188');
      });
  }
  

  function handlerLogOut() {
    mainApi.logout()
    .then((res) => {
      navigate('/sign-in');
      setLoggedIn(false);
      console.log(loggedIn);
      setCurrentUser({});
      setCurrentWeek({});
      localStorage.setItem("loggedIn", false);
    })
    .catch((err) => {
      alert(err);
      alert('205');
    });
  }

  function handleError(error) {
    alert(error, '196');
    console.log('196')
    setLoggedIn(false);
    console.log(loggedIn);
    setCurrentWeek({});
    localStorage.setItem("loggedIn", false);
  }

  function setPrevWeek() {
    setCurrentWeek(isCurrentWeek.map(day => addDays(-7, day)));
  }

  function setNextWeek() {
    setCurrentWeek(isCurrentWeek.map(day => addDays(7, day)));
  }

  return (
    <CurrenUserContext.Provider value={currenUser}>
      <div className="app">
        <Routes>
          <Route path='/sign-in' element={<Login onLoginUser={handleLoginUser} onLoading={isLoading} />}></Route>
          <Route path='/sign-up' element={<Register onRegisterUser={handleRegisterUser} />}></Route>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
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
          </Route>
        </Routes>

        <AddEventPopup onClose={handlerCancelEventClose} onAddEvent={handlerAddEvent} isOpen={isAddEvent}/>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
