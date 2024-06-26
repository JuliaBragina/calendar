import { useState } from "react";
import * as React from 'react';
import styled from "styled-components";
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from "react-hook-form"; 
import Joi from "joi";

const schema = Joi.object({
  text: Joi.string().min(2).max(30).required(),
  startDay: Joi.date().iso().required(),
  startTime: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
  endTime: Joi.string().regex(/^\d{2}:\d{2}$/).required(),
}).required();


const AddEventPopupContainer = styled.div`
  display: ${(props) => props.$isOpen ? 'block' : 'none'};
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
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  margin: 0;
`
const AddEventPopupDescriptionTitle = styled.h3`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  margin: 0 auto;
  width: 90%;
`
const AddEventPopupDescriptionPeriodTime = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`
const AddEventPopupFromInput = styled.input`
  width: 80%;
  display: block;
  margin: 0 auto;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;

`
const AddEventPopupFromInputTime = styled.input`
  width: 80%;
  display: block;
  margin: 0 auto;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  margin-right: 20px;

  &:last-of-type{
    margin-right: 0;
  }
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

  &:disabled {
    opacity: 0.4;
    box-shadow: 0 0 0;
    cursor: default;
  }
`
function AddEventPopup({isOpen, onClose, onAddEvent}) {
  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

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
    <AddEventPopupContainer $isOpen={isOpen}>
      <AddEventPopupFrom name='addEventPopup-form' onSubmit={handleSubmitFrom} noValidate>
        <AddEventPopupTitle >Enter your event</AddEventPopupTitle>

          <AddEventPopupFromContainer>
            <AddEventPopupSection>
              <AddEventPopupDescription >Enter descr</AddEventPopupDescription>
              <AddEventPopupFromInput
                {...register("text")} 
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
                {...register("startDay")} 
                type="date"
                name="startDay"
                autoComplete="off"
                value={eventDayStart || ""}
                onChange={handlerChangeDayStart}
                required />
            </AddEventPopupSection>

            <AddEventPopupDescriptionTitle >Enter period of time</AddEventPopupDescriptionTitle>

            <AddEventPopupDescriptionPeriodTime>
              <AddEventPopupSection>
                <AddEventPopupDescription >from</AddEventPopupDescription>
                  <AddEventPopupFromInputTime 
                    {...register("startTime")} 
                    type="time"
                    name="startTime"
                    autoComplete="off"
                    value={eventTimeStart || ""}
                    onChange={handlerChangeTimeStart}
                    required />
              </AddEventPopupSection>

              <AddEventPopupSection>
                <AddEventPopupDescription >to</AddEventPopupDescription>
                  <AddEventPopupFromInputTime 
                    {...register("endTime")} 
                    type="time"
                    name="endTime"
                    autoComplete="off"
                    value={eventTimeStop || ""}
                    onChange={handlerChangeTimeStop}
                    required />
              </AddEventPopupSection>
            </AddEventPopupDescriptionPeriodTime>
          </AddEventPopupFromContainer>
        

        <AddEventPopupButtons>
          <AddEventPopupButtonsCancel type="button" onClick={onClose}>Cancel</AddEventPopupButtonsCancel>
          <AddEventPopupButtonsOk disabled={!isValid} type="submit">OK</AddEventPopupButtonsOk>
        </AddEventPopupButtons>
      </AddEventPopupFrom>
    </AddEventPopupContainer>
  )
}

export default AddEventPopup;