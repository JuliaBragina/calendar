import React, { useState } from "react";
import styled from "styled-components";

const AddEventPopupContainer = styled.div`
  display: ${(props) => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 20%;
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
padding-top: 15px;
`
const AddEventPopupDescription = styled.p`
margin: 0;
padding-top: 10px;
text-align: center;
`
const AddEventPopupFromInput = styled.input`
width: 85%;
display: block;
margin: 0 auto;
margin-top: 20px;
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
  const [event, setEvent] = useState('');

  function handlerChangeName(e) {
    setEvent(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    onAddEvent({event});
  }

  return(
    <AddEventPopupContainer isOpen={isOpen}>
      <AddEventPopupFrom name='addEventPopup-form' onSubmit={handleSubmitFrom} noValidate>
        <AddEventPopupTitle >https://calendar.com</AddEventPopupTitle>
        <AddEventPopupDescription >Enter Event time:</AddEventPopupDescription>
        <AddEventPopupDescription >YYYY-MM-DD HH:mm:ss</AddEventPopupDescription>
        <AddEventPopupFromInput 
          type="text"
          name="text"
          autoComplete="off"
          value={event || ""}
          onChange={handlerChangeName}
          required />
        <AddEventPopupButtons>
          <AddEventPopupButtonsCancel type="button" onClick={onClose}>Cancel</AddEventPopupButtonsCancel>
          <AddEventPopupButtonsOk type="submit">OK</AddEventPopupButtonsOk>
        </AddEventPopupButtons>
      </AddEventPopupFrom>
    </AddEventPopupContainer>
  )
}

export default AddEventPopup;