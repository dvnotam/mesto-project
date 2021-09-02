import React from "react";
import auth_invalid from "../images/auth_invalid.svg";
import auth_complete from "../images/auth_complete.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_auth ${props.isOpenPopup ? "popup_open" : ""}`}
    >
      <div className="popup__content">
        <img
          className="popup__auth-img"
          src={props.isRegistration ? auth_complete : auth_invalid}
          alt="Иконка результата"
        />
        <h2 className="popup__title popup__title_auth">
          {props.isRegistration
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
