import PopupAuth from './PopupAuth';
import { useState } from 'react';

function Login({ onLoginUser, onLoading }) {
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
    <PopupAuth onSubmit={handleSubmitFrom} onLoading={onLoading} textWelcome='Рады видеть' linkButton="/"  link='/sign-up' linkText='Зарегистрироваться' buttonText='Войти' paragr='Еще не зарегистрирваны?' >
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

export default Login;