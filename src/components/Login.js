import PopupAuth from './PopupAuth';
import { useState } from 'react';
import styled from 'styled-components';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from "react-hook-form"; 
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().required().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
}).required();

const PopupAuthSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const PopupAuthPlaceholder = styled.label`
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #8B8B8B;
  margin: 0;
  padding-bottom: 10px;
`;

const PopupAuthInput = styled.input`
  background: #fff;
  height: 46px;
  border-radius: 8px;
  outline: none;
  text-indent: 15px;
  color: #000;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  border: 1px solid rgb(105, 105, 125);
  padding: 0;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 10px;
  }
`;

const PopupAuthError = styled.span`
  display: inline-block;
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  height: 12px;
  color: #EE3465;
  margin: 0;
`;

function Login({ onLoginUser, onLoading }) {
  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  function handlerChangeEmail(e) {
    setLogin(e.target.value);
  }

  function handlerChangePassword(e) {
    setPass(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    onLoginUser({
      login,
      pass,
    });
  }

  return(
    <PopupAuth 
      onSubmit={handleSubmitFrom}
      onLoading={onLoading} 
      validButton={isValid} 
      textWelcome='Рады видеть' 
      linkButton="/"  
      link='/sign-up'
       linkText='Зарегистрироваться' 
       buttonText='Войти' 
       paragr='Еще не зарегистрирваны?' >
        
      <PopupAuthSection>
        <PopupAuthPlaceholder>E-mail</PopupAuthPlaceholder>
        <PopupAuthInput
          {...register("email")} 
          type='email'
          name='email'
          autoComplete="off"
          value={login || ""}
          onChange={handlerChangeEmail}
        />
        <PopupAuthError>{login?.message}</PopupAuthError>
      </PopupAuthSection>

      <PopupAuthSection>
        <PopupAuthPlaceholder>Пароль</PopupAuthPlaceholder>
        <PopupAuthInput
          {...register("password")}
          type='password'
          name='password'
          autoComplete="off"
          value={pass || ""}
          onChange={handlerChangePassword}
        />
        <PopupAuthError>{pass?.message}</PopupAuthError>
      </PopupAuthSection>
    </PopupAuth>
  ) 
}

export default Login;
