import React from 'react';
import {Link} from 'react-router-dom';

const Register = ({onRegister}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginUserData = {
      email,
      password,
    };
    onRegister(loginUserData);
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__form-content">
          <p className="auth__form-title">Sign up</p>

          <input
            className="auth__form-input"
            name="email"
            placeholder="Email"
            id="email"
            type="text"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="auth__form-input"
            name="password"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="auth__form-content">
          <button className="auth__button" type="submit">
            Sign up
          </button>
          <p className="auth__text">
            Already a member?{' '}
            <Link className="auth__link" to="login">
              Log in here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
