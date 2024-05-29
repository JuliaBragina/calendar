import React from 'react';
import styled from 'styled-components';

const Event2Item = styled.div`
  box-sizing: border-box;
  width: 96%;
  height: ${props => props.height}px;
  background: rgb(62, 66, 117);

  cursor: pointer;
  position: absolute;
  top: ${props => props.top}px;
`;

function Event({event, day, onDeleteEvent }) {
  console.log(((event.stop.getHours() * 60) + (event.stop.getMinutes()) - (event.start.getHours() * 60) + (event.start.getMinutes())));
  function handleDeleteEvent(i) {
    onDeleteEvent(event, i);
  }

  return (
    <Event2Item
      key={event.id}
      top={30 * ((event.start.getHours()) + (event.start.getMinutes() / 60))}
      height={((event.stop.getHours() * 60) + (event.stop.getMinutes()) - (event.start.getHours() * 60) + (event.start.getMinutes())) / 2}
      onClick={() => handleDeleteEvent(0)} ></Event2Item>
  );
}

export default Event;