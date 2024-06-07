import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function MainContainer({ onAddEvent, onLogOut, isShowDeleteButton, onDeleteEventFooter, loggedIn, onDeleteEvent, currentDay, currentWeek, events, currentMonth, isCurrentMonth, onSetPrevWeek, onSetNextWeek }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <Header onAddEvent={onAddEvent} onLogOut={onLogOut} />
      <Main  onDeleteEvent={onDeleteEvent} currentDay={currentDay} currentWeek={currentWeek} events={events} currentMonth={currentMonth} isCurrentMonth={isCurrentMonth} onSetPrevWeek={onSetPrevWeek} onSetNextWeek={onSetNextWeek}/>
      <Footer onDeleteEventFooter={onDeleteEventFooter} isShowDeleteButton={isShowDeleteButton} />
    </>
  );
}

export default MainContainer;
