import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function PopupAuth({ children, textWelcome, linkButton, link, linkText, buttonText, paragr, onSubmit, validButton, onLoading }) {
    return(
      <div className="popupAuth">
        <p className='popupAuth__welcome'>{textWelcome}</p>
        <form className='popupAuth__form'>

          {children}
       
          <NavLink to={linkButton}>
            <button onClick={onSubmit} disabled={onLoading} type='submit' className={(link === '/sign-in') ? "popupAuth__button" : "popupAuth__button popupAuth__button_toLogin"}>{onLoading ? 'Вход...' : buttonText}</button>
          </NavLink>
          <section className='popupAuth__login'>
            <p className="popupAuth__paragraph">{paragr}</p>
            <Link to={link} className="popupAuth__link">{linkText}</Link>
          </section>
        </form>
      </div>
    ) 
  }
  
  export default PopupAuth;
  