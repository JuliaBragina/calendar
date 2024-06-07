import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = styled.div`
  text-align: center;
`

const PpageNotFound = styled.p`
  margin: 0;
  padding-top: 5px;
  padding-bottom: 184px;

  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000;
`

const NotFound404 = styled.p`
  margin: 0;
  padding-top: 246px;

  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 140px;
  line-height: 169px;
  color: #000;
`

const NotFoundLink = styled(Link)`
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #4285F4;
  text-decoration: none;
  position: relative;

  &:hover:after {
    content: "";
    width: 100%;
    display: block;
    position: absolute;
    left: 0;
    bottom: -7px;
    height: 2px; 
    background-color: #4285F4;
  }
`

function NotFound() {
  return(
    <NotFoundPage>
      <NotFound404>404</NotFound404>
      <PpageNotFound>Страница не найдена</PpageNotFound>
      <NotFoundLink to='/'>Назад</NotFoundLink>
    </NotFoundPage>
  )
}

export default NotFound;
