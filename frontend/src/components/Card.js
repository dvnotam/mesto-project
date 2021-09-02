import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash' : 'element__trash.hide'}`
    );
    console.log(props, 'CARD -> props')
    console.log(props.cards, 'CARD -> cards')
    console.log(props.cards.likes, 'CARD -> Likes')
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card._id);
    }
    return (
        <div className="element">
            <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            {
                isOwn && <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
            }
            <div className="element__content">
                <h2 className='element__title'>{props.card.name}</h2>
                <div className="element__group">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}


export default Card
