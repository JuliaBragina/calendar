import * as React from 'react';
import styled from 'styled-components';

const Event2Item = styled.div`
  box-sizing: border-box;
  width: calc(99% / 7);
  height: ${props => props.$height}px;
  background: rgb(62, 66, 117);

  cursor: pointer;
  position: absolute;
  top: ${props => props.$top}px;
  left: ${props => props.$left * (100 / 7)}%;
  max-width: calc(99% / 7);
  overflow: hidden;

  &:hover {
    background: rgb(255, 49, 49);
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

function Event({event, day, onDeleteEvent }) {
  function handleDeleteEvent(event, i) {
    onDeleteEvent(event, i);
  }

  return (
    <Event2Item
      key={event.id}
      $top={30 * ((event.start.getHours()) + (event.start.getMinutes() / 60))}
      $left={day}
      $height={((event.stop.getHours() * 60) + (event.stop.getMinutes()) - (event.start.getHours() * 60) + (event.start.getMinutes())) / 2}
      onClick={() => handleDeleteEvent(event, event.id)} >
      <EventItemIsEventText>{event.name}</EventItemIsEventText>
    </Event2Item>
  );
}

export default Event;
