import React from "react";
import Event from "./Event";
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


function TimeLine({onDeleteEvent, events, currentWeek}) {
  const currentWeekDates = currentWeek.map(day => day.getDate());
  const massTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  let now = new Date();

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
    const massTimeTemp = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    massTime.map((timeSlot, i) => {
      let j = 0;
      massTimeTemp[i]["time"] = timeSlot.split(':')[0];
      todayEvents.map((event) => {
      let date = new Date(event.start);
      if(timeSlot.split(':')[0] == date.getHours()) {
        massTimeTemp[i][j] = event;
        j = j + 1;
      }
    })})
    todayEvents.length = 0;
    return massTimeTemp;
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
        currentWeekDates.map((day, index) => <div>
          {
            makeTimeEvents(findEventsForToday(day, index)).map((event, i) => <Event key={i} event={event} onDeleteEvent={onDeleteEvent}/>)
          }
        </div>)
      }
      </TimeLineEvent>
    </TimeLineContainer>
  )
}
export default TimeLine;