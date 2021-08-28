import React from 'react';

const defaultCard = {
    name: '',
    link: '',
}

function ImagePopup (props) {
    const popupShow = props.card ? 'popup_open' : '';

    let card = props.card
    if (!card) {
        card = defaultCard
    }

    return (
        <div className={`popup popup_overlay-window ${popupShow}`}>
            <div className="group">
                <div className="group__box">
                    <img className="group__photo" alt={card.name} src={card.link}/>
                        <button className="group__close-button popup__close-button" onClick={props.onClose}/>
                        <h2 className="group__title">{card.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup