import React from "react";
import { useState, useEffect, useRef } from 'react';
import Event2 from "./Event2";
import styled from "styled-components";

const TimeLineContainer = styled.section`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
`
const TimeLineTime = styled.div`
  display: flex;
  flex-direction: column;
`
const TimeLineItenTime = styled.div`
  width: 60px;
  height: 30px;
  position: relative;
`
const TimeLineText = styled.span`
  position: absolute;
  top: -30%;
  left: 20%;

  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: rgb(193,193,193);
`
const TimeLineEvent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 30px);
`
const EventItemOneday = styled.div`
  position: relative;  
`;
const EventItemHours = styled.div`
  border: 1px rgb(230, 230, 230) solid;
  height: 30px;
  box-sizing: border-box;
`;
const EventItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
`

function TimeLine({onDeleteEvent, events, currentWeek}) {
  const currentWeekDates = currentWeek.map(day => day.getDate());
  const massTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  
  function findEventsForDay(day, i) {
    let todayEvents = [];
    todayEvents.length = 0;
    events.map((event) => {
    if(event && event.start.getFullYear() + '-' + event.start.getMonth() + '-' + event.start.getDate() === (currentWeek[i].getFullYear() + '-' + currentWeek[i].getMonth() + '-' + day)) {
        todayEvents.push(event);
      }
    });
    return todayEvents;
  }

  return(
    <TimeLineContainer>
      <TimeLineTime>
      {
        massTime.map((elem) => <TimeLineItenTime><TimeLineText>{elem}</TimeLineText></TimeLineItenTime>)
      }
      </TimeLineTime>
      <TimeLineEvent>
        {
          currentWeekDates.map((day, i) => (
          <EventItemOneday key={day}>
            {
              massTime.map((time) => <EventItemHours key={time} />)
            }
            <EventItem>
              {
                findEventsForDay(day, i).map(event => <Event2 key={event.id} day={day} event={event} onDeleteEvent={onDeleteEvent} />
              )}
            </EventItem>
          </EventItemOneday>
        ))}
      </TimeLineEvent>
 
    </TimeLineContainer>
  )
}
export default TimeLine;

/*currentWeekDates.map((day, index) => <div>
  {
    makeTimeEvents(findEventsForToday(day, index)).map((event) => <Event key={event.id} event={event} onDeleteEvent={onDeleteEvent}/>)
  }
</div>)

 function findEventsForToday(day, index) {
    let todayEvents = [];
    todayEvents.length = 0;
    events.map((event) => {
      let date = new Date(event.start);
      if(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() === (now.getFullYear() + '-' + currentWeek[index].getMonth() + '-' + day)) {
        todayEvents.push(event);
      }})
    return todayEvents;
  }

  function makeTimeEvents(todayEvents) {
    const massTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  
    const massTimeTemp = massTime.map(timeSlot => ({
      time: timeSlot.split(':')[0],
      events: [],
    }));

    todayEvents.forEach(event => {
      if(event && event.start && event.stop) {
        let date = new Date(event.start);
        let dateStop = new Date(event.stop);
    
        massTimeTemp.forEach((timeSlot, i) => {
          let slotTime = parseInt(timeSlot.time);
    
          if (slotTime >= date.getHours() && slotTime < dateStop.getHours()) {
            timeSlot.events.push(event);
          }
        });
      }
    });
    return massTimeTemp;
  }
*/

/*
const myDivRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (myDivRef.current) {
        setDivWidth(myDivRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
*/