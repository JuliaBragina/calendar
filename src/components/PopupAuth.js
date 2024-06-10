import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PopupAuthContainer = styled.div`
  width: 396px;
  height: 560px;
  margin: 0 auto;
  padding-top: 70px;

  @media screen and (max-width: 560px) { 
    width: 81vw;
    height: 463px;
    margin: 0 auto;
    padding-top: 56px;
  }
`;

const PopupAuthWelcome = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #fff;
  margin: 0;
  padding-bottom: 40px;

  @media screen and (max-width: 560px) {
    padding-bottom: 80px;
    text-align: center;
  }
`;

const PopupAuthButton = styled.button`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  width: 396px;
  height: 45px;
  border-radius: 3px;
  background: rgb(255, 49, 49);
  text-decoration: none;
  border: 0;
  margin: 0;
  padding: 0;
  margin-top: 69px;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 12px 12px 24px 0px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    box-shadow: 0 0 0;
    cursor: default;
  }

  &.toLogin {
    margin-top: 155px;

    @media screen and (max-width: 560px) {
      margin-top: 247px;
    }
  }

  @media screen and (max-width: 560px) {
    width: 81vw;
    font-size: 12px;
    line-height: 45px;
    margin-top: 157px;
  }
`;

const PopupAuthLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 16px;

  @media screen and (max-width: 560px) {
    padding-top: 14px;
  }
`;

const PopupAuthParagraph = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #8B8B8B;
  margin: 0;
  padding-right: 6px;

  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const PopupAuthLink = styled(Link)`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: rgb(255, 49, 49);
  text-decoration: none;
  position: relative;
  transition: all 0.4s ease;

  &:hover:after {
    content: "";
    width: 100%;
    display: block;
    position: absolute;
    left: 0;
    bottom: -7px;
    height: 2px; 
    background-color: rgb(255, 49, 49);
  }

  @media screen and (max-width: 560px) {
    font-size: 12px;
    line-height: 15px;
  }
`;

function PopupAuth({ children, textWelcome, link, linkText, buttonText, paragr, onSubmit, onLoading, validButton }) {

  return (
    <PopupAuthContainer>
      <PopupAuthWelcome>{textWelcome}</PopupAuthWelcome>
      <form className='popupAuth__form' onSubmit={onSubmit}>
        {children}
        <PopupAuthButton type='submit' disabled={onLoading || !validButton}>
          {onLoading ? 'Вход...' : buttonText}
        </PopupAuthButton>
        <PopupAuthLogin>
          <PopupAuthParagraph>{paragr}</PopupAuthParagraph>
          <PopupAuthLink to={link}>{linkText}</PopupAuthLink>
        </PopupAuthLogin>
      </form>
    </PopupAuthContainer>
  );
}

export default PopupAuth;

  