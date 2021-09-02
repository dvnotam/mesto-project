import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function PopupProfileForm(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNewName(evt) {
    setName(evt.target.value);
  }

  function handleNewAbout(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onNewUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name="profile-form"
      title="Редактировать профиль"
      buttonSubmit="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isOpenPopup={props.isOpen}
      onClosePopup={props.onClose}
    >
      <input
        id="name"
        type="text"
        name="name"
        className="popup__item popup__item_profile-name"
        placeholder="Имя"
        value={name || ""}
        onChange={handleNewName}
        required
        minLength="2"
        maxLength="40"
      />
      <span id="name-error" className="popup__error" />
      <input
        id="job"
        type="text"
        name="about"
        className="popup__item popup__item_profile-about"
        value={about || ""}
        onChange={handleNewAbout}
        placeholder="Вид деятельности"
        required
        minLength="2"
        maxLength="200"
      />
      <span id="job-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default PopupProfileForm;
