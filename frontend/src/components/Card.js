import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    console.log(currentUser)

    const isOwn = props.card.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash' : 'element__trash.hide'}`
    );

    const isLiked = props.card.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`

    function handleClick() {
        props.onCardClick(props.card.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card.card._id);
    }
    return (
        <div className="element">
            <img className="element__photo" src={props.card.card.link} alt={props.card.card.name} onClick={handleClick}/>
            {
                isOwn && <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
            }
            <div className="element__content">
                <h2 className='element__title'>{props.card.card.name}</h2>
                <div className="element__group">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <span className="element__like-counter">{props.card.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}


export default Card
