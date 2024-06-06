import * as React from 'react';
import TimeLine from './TimeLine';
import WeekLine from './WeekLine';

function Main({ onDeleteEvent, currentDay, currentWeek, events, currentMonth, isCurrentMonth, onSetPrevWeek, onSetNextWeek }) {
  return( 
    <main className="main">
      <WeekLine
        currentDay = {currentDay}
        currentWeek = {currentWeek}
        currentMonth={currentMonth}
        isCurrentMonth = {isCurrentMonth}
        onSetPrevWeek = {onSetPrevWeek}
        onSetNextWeek = {onSetNextWeek}/>
      <TimeLine onDeleteEvent = {onDeleteEvent} events = {events} currentWeek = {currentWeek} currentMonth = {currentMonth}/>
    </main>
  )
}

export default Main;