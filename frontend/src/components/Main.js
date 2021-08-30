import React from "react";
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);
    console.log(currentUser, 'user main')
    console.log(props.cards, '--> props main')

    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar-image" />
                        <div className="profile__avatar-edit" onClick={props.onEditAvatar} />
                    </div>
                    <div className="profile__info">
                        <h2 className="profile__title">{currentUser.name}</h2>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    <button className="profile__edit-button" onClick={props.onEditProfile} />
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} />
            </section>

            <section className="elements">
                {props.cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                ))}
            </section>
        </main>
    )
}

export default Main;