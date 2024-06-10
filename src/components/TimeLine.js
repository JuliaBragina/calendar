import * as React from 'react';
import Event from "./Event";
import styled from "styled-components";

const TimeLineContainer = styled.section`
  display: flex;
  max-width: 100%;
  justify-content: space-between;
`;
const TimeLineTime = styled.div`
  display: flex;
  flex-direction: column;
`;
const TimeLineItenTime = styled.div`
  width: 60px;
  height: 30px;
  position: relative;
`;
const TimeLineText = styled.span`
  position: absolute;
  top: -30%;
  left: 20%;

  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: rgb(193,193,193);
`;
const TimeLineEvent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 30px);
  position: relative;
  border: 1px solid #ccc;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #ccc 1px, transparent 1px) repeat 0 0 / 14.2857% 100%, linear-gradient(to bottom, #ccc 1px, transparent 1px) repeat 0 0 / 100% 4.1667%;
    z-index: -1;
  }
`;

function TimeLine({ onDeleteEvent, events }) {
  const massTime = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', 
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  return (
    <TimeLineContainer>
      <TimeLineTime>
        {massTime.map((elem, index) => (<TimeLineItenTime key={index}><TimeLineText>{elem}</TimeLineText></TimeLineItenTime>))}
      </TimeLineTime>
      <TimeLineEvent>
        {
          events.map(event => (<Event key={event.id} day={event.start.getDay()} event={event} onDeleteEvent={onDeleteEvent}/>))
        }
      </TimeLineEvent>
    </TimeLineContainer>
  );
}

export default TimeLine;