import React from 'react';
import styled from 'styled-components';
import addButtonImg from '../images/add-button.svg'
import logOutButtonImg from '../images/logout-button.svg'

const ContainerHeader = styled.header`
  margin: 0 auto;
  display: flex;
  max-width: 85%;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`
const HeaderTitle = styled.h1`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
`
const HeaderButtons = styled.div`
  width: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderButton = styled.button`
  background-size: 100%;
  background-position:  center;
  background-repeat: no-repeat;
  background-color: transparent;
  background-image: url('${props => props.url}');
  border: 0;
  height: 30px;
  width: 30px;
  object-fit: contain;
  cursor: pointer;
`

function Header({onEddEvent, onLogOut}) {
  return(
    <ContainerHeader> 
      <HeaderTitle>Interview Calendar</HeaderTitle>
      <HeaderButtons>
        <HeaderButton url={addButtonImg} type="submit" onClick={onEddEvent}></HeaderButton>
        <HeaderButton url={logOutButtonImg} type="submit" onClick={onLogOut}></HeaderButton>
      </HeaderButtons>
    </ContainerHeader>
  )
}

export default Header;