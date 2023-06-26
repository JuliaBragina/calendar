import PopupAuth from './PopupAuth';
import { useState } from 'react';

function Register({ onRegisterUser, onLoading }) {

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

  return(
    <PopupAuth
      textWelcome='Добро пожаловать!'
      linkButton="/"
      link='/sign-in'
      linkText='Войти'
      buttonText='Зарегистрироваться'
      paragr='Уже зарегистрирваны?'
      onSubmit={handleSubmitFrom}
      onLoading={onLoading}>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>Имя</label>
        <input
          type='text'
          name="name"
          className='popupAuth__input'
          autoComplete="off"
          value={name || ""}
          onChange={handlerChangeName}>
        </input>
        <span className='popupAuth__error'>{name?.message}</span>
      </section>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>E-mail</label>
        <input
          type='email'
          name='email'
          className='popupAuth__input'
          autoComplete="off"
          value={login || ""}
          onChange={handlerChangeEmail}>
        </input>
        <span className='popupAuth__error'>{login?.message}</span>
      </section>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>Пароль</label>
        <input
          type='password'
          name='password'
          className='popupAuth__input'
          autoComplete="off"
          value={pass || ""}
          onChange={handlerChangePassword}>
        </input>
        <span className='popupAuth__error'>{pass?.message}</span>
      </section>

    </PopupAuth>
  ) 
}

export default Register;
