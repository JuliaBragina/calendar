import React from 'react';
import styled from 'styled-components';

const EventItem = styled.div`
  box-sizing: border-box;
  border: 1px rgb(230, 230, 230) solid;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
`;
const EventItemIsEvent = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  box-sizing: border-box;

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

  &:hover::before {
    background: rgb(11, 11, 18);
  }
`;
const EventItemIsEventText = styled.p`
  margin: 0;
  padding: 2px;
  padding-left: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 10px;
  line-height: 10px;
  color: #fff;
`;

function Event({ event, onDeleteEvent }) {
  const eventCount = Object.keys(event).length - 1;
  const eventWidth = 100 / eventCount;

  function handleDeleteEvent(i) {
    onDeleteEvent(event, i);
  }

  function makeObj() {
    let massEvents = [];
    for(let i = 0; i < Object.keys(event).length - 1; i++) {
      massEvents.push(event[i]);
    }
    return massEvents;
  }

  return (
    <EventItem>
      {eventCount <= 0 ? (
        <EventItemIsEvent ></EventItemIsEvent>
      ) : (
        makeObj().map((item, i) => (
          <EventItemIsEvent
            key={item.id}
            left={eventWidth * i}
            width={eventWidth}
            onClick={() => handleDeleteEvent(i)}
          >
            <EventItemIsEventText>{item.name}</EventItemIsEventText>
          </EventItemIsEvent>
        ))
      )}
    </EventItem>
  );
}

export default Event;