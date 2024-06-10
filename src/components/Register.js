import React, { useState } from 'react';
import PopupAuth from './PopupAuth';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
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

function Register({ onRegisterUser, onLoading }) {
  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  function handlerChangeName(e) {
    setName(e.target.value);
  }

  function handlerChangeEmail(e) {
    setLogin(e.target.value);
  }

  function handlerChangePassword(e) {
    setPass(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    onRegisterUser({
      name,
      login,
      pass,
    });
  }

  return (
    <PopupAuth
      textWelcome='Добро пожаловать!'
      linkButton="/"
      link='/sign-in'
      linkText='Войти'
      buttonText='Зарегистрироваться'
      paragr='Уже зарегистрирваны?'
      onSubmit={handleSubmitFrom}
      onLoading={onLoading}
      validButton={isValid} >
      <PopupAuthSection>
        <PopupAuthPlaceholder>Имя</PopupAuthPlaceholder>
        <PopupAuthInput
          {...register("name")}
          type='text'
          name="name"
          autoComplete="off"
          value={name || ""}
          onChange={handlerChangeName}
        />
        <PopupAuthError>{name?.message}</PopupAuthError>
      </PopupAuthSection>

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
  );
}

export default Register;
