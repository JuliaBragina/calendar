import React from 'react';
import styled from 'styled-components';

const EventItem = styled.div`
  box-sizing: border-box;
  border: 1px rgb(230, 230, 230) solid;
  height: 30px;
  position: relative;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const EventItemIsEvent = styled.div`
cursor: pointer;
width: 100%;
height: 100%;
position: relative;

&::before {
  content: "";
  position: absolute;
  bottom: 5%;
  left: 2%;
  width: 96%;
  height: 90%;
  z-index: -1;
  border-radius: 2px;
  background: rgb(62, 66, 117);
}

&:hover::before{
  background: rgb(11, 11, 18);
}
`

function Event({ event, onDeleteEvent }) {

  function makeObj() {
    let massEvents = [];
    for(let i = 0; i < Object.keys(event).length - 1; i++) {
      massEvents.push(event[i]);
    }
    return massEvents;
  }

  return (
    Object.keys(event).length <= 1
    ? <EventItem></EventItem>
    : <EventItem type='submit'>
        {
          makeObj().map((item, i) => <EventItemIsEvent key={item.id} onClick={_ => onDeleteEvent(event, i)}></EventItemIsEvent>)
        }
      </EventItem>
  );
};

export default Event;