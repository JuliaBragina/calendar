import { useEffect, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import leftButton from '../images/left-button.svg';
import rightButton from '../images/rigth-button.svg';


const Weekline = styled.section`
  max-width: 100%;
  height: 100px;
  background-color: rgb(246,246,246);
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const WeeklineBlock = styled.div`
  min-width: 60px;
`
const WeekLineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const WeekLineWeek = styled.div`
  width: 100%;
  margin-left: auto; 
  margin-right: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 30px;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
`
const WeekLineDay = styled.p`
  margin: 0;
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  position: relative;
  z-index: 1;
`
const WeelKineDayIsBif = styled.p`
  margin: 0;
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  position: relative;
  z-index: 1;
    font-family: Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    color: ${props => (props.$day === props.$currentDay && props.$month === props.$currentMonth)  ? 'white' : 'black'}
`
const WeekLineDayIsCurrent = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  box-sizing: border-box;
  background-color: rgb(255,49,49);
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: -1;
`
const WeekLineMonth = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 30px;

  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`
const WeekLineButtonLeft = styled.button`
  padding: 0;
  background-image: url('${props => props.$url}');
  background-position:  center;
  background-repeat: no-repeat;
  background-color: transparent;
  height: 25px;
  width: 25px;
  object-fit: contain;
  background-size: 100%;
  border: 0;
  cursor: pointer;
`
const WeekLineNameMonth = styled.p`
 margin: 0;
`

function WeekLine ({ currentDay, currentWeek, onSetPrevWeek, onSetNextWeek }) {
  let now = new Date();
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const [isCurrentMonth, setCurrentMonth] = useState(now.getMonth());
  
  function checkMonth() {
    const monthesCount = {
      prevMonth: 0,
      curMonth: 0,
      nextMonth: 0
    };

    currentWeek.map(day => isCurrentMonth === day.getUTCMonth() 
    ? monthesCount.curMonth = monthesCount.curMonth + 1 
    : isCurrentMonth - day.getUTCMonth() === -1 
      ? monthesCount.nextMonth = monthesCount.nextMonth + 1 
      : monthesCount.prevMonth = monthesCount.prevMonth + 1);

    if(monthesCount.prevMonth - monthesCount.curMonth > 1) {
      setCurrentMonth(isCurrentMonth - 1);
    }
    if(monthesCount.nextMonth - monthesCount.curMonth > 1) {
      setCurrentMonth(isCurrentMonth + 1);
    }
  }

  useEffect(() => {
    checkMonth();
  }, [currentWeek]);

  return(
    <Weekline>
      <WeeklineBlock></WeeklineBlock>
      <WeekLineContainer>
        <WeekLineWeek >
          {
            weekDays.map((day) => <WeekLineDay key={day}>{day}</WeekLineDay>)
          }
        </WeekLineWeek>
        <WeekLineWeek>
          {
            currentWeek.map((day) => <WeelKineDayIsBif key={day.getDate()} $day={day.getDate()} $month={day.getMonth()} $currentMonth={now.getMonth()} $currentDay={currentDay}>{day.getDate()}
            {
              (day.getDate() === currentDay) && (day.getMonth() === now.getMonth()) && <WeekLineDayIsCurrent></WeekLineDayIsCurrent>
            }
            </WeelKineDayIsBif>)
          }
        </WeekLineWeek>
        <WeekLineMonth>
          <WeekLineButtonLeft $url={leftButton} type='click' onClick={onSetPrevWeek}></WeekLineButtonLeft>
          <WeekLineNameMonth>{months[isCurrentMonth]}</WeekLineNameMonth>
          <WeekLineButtonLeft $url={rightButton} type='click' onClick={onSetNextWeek}></WeekLineButtonLeft>
        </WeekLineMonth>
      </WeekLineContainer>
    </Weekline>
  )
}

export default WeekLine;