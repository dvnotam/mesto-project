import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          value={email}
          onChange={handleChangeEmail}
          id="reg-email"
          name="email"
          type="email"
          minLength="4"
          required
          placeholder="Email"
        />
        <input
          className="auth__input"
          value={password}
          onChange={handleChangePassword}
          id="reg-password"
          name="password"
          type="password"
          minLength="6"
          required
          placeholder="Пароль"
        />
        <button className="auth__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__login-link">
        Уже зарегистрированны? Войти
      </Link>
    </div>
  );
}

export default Register;
