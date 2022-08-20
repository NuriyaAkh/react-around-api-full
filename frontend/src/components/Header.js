import logo from '../images/logo.svg';
import React from 'react';
import {Link, Route} from 'react-router-dom';

const Header = ({onLogOut, email}) => {
  const handleLogOut = () => {
    onLogOut();
  };
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo Around US" />
        <Route exact path="/">
        <div className="header__container">
          <p className="header__user-email">{email}</p>
          <button className="header__log-out" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__link" to="signin">
          Log In
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="signup">
          Sign Up
        </Link>
      </Route>
    </header>
  );
};
export default Header;
