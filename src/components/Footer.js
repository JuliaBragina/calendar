import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  max-width: 100%;
  height: 80px;
  background-color: rgb(246,246,246);
  position: sticky;
  bottom: 0;
  right: 0;
`
const FooterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 89%;
  padding-top: 30px;
  margin: 0 auto;
`
const FooterButton = styled.button`
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: rgb(255,49,49);
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: ${props => props.isShown ? 'block' : 'none'};
`

function Footer ({isShowDeleteButton, onDeleteEventFooter}) {
   return(
    <FooterContainer>
      <FooterButtons>
        <FooterButton isShown={true}>Today</FooterButton>
        <FooterButton isShown={isShowDeleteButton} type='click' onClick={_ => onDeleteEventFooter(true)}>Delete</FooterButton>
      </FooterButtons>
    </FooterContainer>
  )
}

export default Footer;