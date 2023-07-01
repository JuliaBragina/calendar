import React, { useState } from "react";
import styled from "styled-components";

const AddEventPopupContainer = styled.div`
  display: ${(props) => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 28%;
`
const AddEventPopupFrom = styled.form`
width: 100%;
height: 100%;
background: rgb(230,230,231);
border-radius: 10px;
`
const AddEventPopupTitle = styled.h2`
font-family: 'Inter', Arial, sans-serif;
font-weight: 400;
font-size: 20px;
line-height: 22px;
margin: 0;
text-align: center;
padding: 15px;
`
const AddEventPopupFromContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
height: 60%;
`
const AddEventPopupSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`
const AddEventPopupDescription = styled.p`
margin: 0;
flex-basis: 20%;
`
const AddEventPopupDescriptionPeriodTime = styled.div`
display:flex;

`
const AddEventPopupFromInput = styled.input`
width: 80%;
display: block;
margin: 0 auto;
`
const AddEventPopupButtons = styled.div`
margin-top: 15px;
`
const AddEventPopupButtonsCancel = styled.button`
border: 0;
background-color: transparent;
cursor: pointer;
width: 50%;
padding: 0;
height: 43px;

border-radius: 0 0 0 10px;
border-top: 1px rgb(105,105,125) solid;
border-right: 1px rgb(105,105,125) solid;
box-sizing: border-box;

&:hover {
  opacity: .5;
}
`
const AddEventPopupButtonsOk = styled.button`
border: 0;
background-color: transparent;
cursor: pointer;
width: 50%;
padding: 0;
height: 43px;

border-radius: 0 0 10px 0;
border-top: 1px rgb(105,105,125) solid;
box-sizing: border-box;

&:hover {
  opacity: .5;
}
`
function AddEventPopup({isOpen, onClose, onAddEvent}) {
  const [eventText, setEventText] = useState('');
  const [eventDayStart, setventDayStart] = useState('');
  const [eventTimeStart, setEventTimeStart] = useState('');
  const [eventTimeStop, setEventTimeStop] = useState('');

  function handlerChangeName(e) {
    setEventText(e.target.value);
  }

  function handlerChangeDayStart(e) {
    setventDayStart(e.target.value);
  }

  function handlerChangeTimeStart(e) {
    setEventTimeStart(e.target.value);
  }

  function handlerChangeTimeStop(e) {
    setEventTimeStop(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    onAddEvent({eventText, eventDayStart, eventTimeStart, eventTimeStop});
  }

  return(
    <AddEventPopupContainer isOpen={isOpen}>
      <AddEventPopupFrom name='addEventPopup-form' onSubmit={handleSubmitFrom} noValidate>
        <AddEventPopupTitle >Enter your event</AddEventPopupTitle>

          <AddEventPopupFromContainer>
            <AddEventPopupSection>
              <AddEventPopupDescription >Enter descr</AddEventPopupDescription>
              <AddEventPopupFromInput 
                type="text"
                name="text"
                autoComplete="off"
                value={eventText || ""}
                onChange={handlerChangeName}
                required />
            </AddEventPopupSection>

            <AddEventPopupSection>
              <AddEventPopupDescription >Enter day</AddEventPopupDescription>
              <AddEventPopupFromInput 
                type="date"
                name="startDay"
                autoComplete="off"
                value={eventDayStart || ""}
                onChange={handlerChangeDayStart}
                required />
            </AddEventPopupSection>

            <AddEventPopupDescription >Enter period of time</AddEventPopupDescription>
            <AddEventPopupDescriptionPeriodTime>
              <AddEventPopupSection>
              <AddEventPopupDescription >from</AddEventPopupDescription>
                <AddEventPopupFromInput 
                  type="time"
                  name="timeStart"
                  autoComplete="off"
                  value={eventTimeStart || ""}
                  onChange={handlerChangeTimeStart}
                  required />
              </AddEventPopupSection>

              <AddEventPopupSection>
                <AddEventPopupDescription >to</AddEventPopupDescription>
                <AddEventPopupFromInput 
                  type="time"
                  name="startTime"
                  autoComplete="off"
                  value={eventTimeStop || ""}
                  onChange={handlerChangeTimeStop}
                  required />
              </AddEventPopupSection>
            </AddEventPopupDescriptionPeriodTime>

          </AddEventPopupFromContainer>
        

        <AddEventPopupButtons>
          <AddEventPopupButtonsCancel type="button" onClick={onClose}>Cancel</AddEventPopupButtonsCancel>
          <AddEventPopupButtonsOk type="submit">OK</AddEventPopupButtonsOk>
        </AddEventPopupButtons>
      </AddEventPopupFrom>
    </AddEventPopupContainer>
  )
}

export default AddEventPopup;