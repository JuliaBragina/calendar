import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';

const RootContainer = styled.div`
  margin: 0 auto;
  max-width: 740px;
  min-width: 310px;
  
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  color: #000;
  position: relative;
`
//background-color: #fff;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootContainer>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </RootContainer>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
