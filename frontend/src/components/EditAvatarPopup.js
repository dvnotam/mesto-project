import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onNewAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function validCloseButton() {
    props.onClose();
  }

  return (
    <PopupWithForm
      name="avatar-profile"
      title="Обновить Аватар"
      buttonSubmit="Сохранить"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isOpenPopup={props.isOpen}
      onClosePopup={validCloseButton}
    >
      <input
        id="avatar-photo"
        type="url"
        name="avatar"
        ref={avatarRef}
        className="popup__item popup__item_avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        id="avatar-photo-error"
        type="avatar-error"
        className="popup__error"
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
