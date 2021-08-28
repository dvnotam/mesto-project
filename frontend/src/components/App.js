import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import '../index.css'
import api from '../utils/api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import * as auth from '../utils/auth.js'
import ProtectedRoute from './ProtectedRoute.js'
import Header from '../components/Header.js'
import Login from './Login.js'
import Main from '../components/Main.js'
import Footer from './Footer.js'
import EditAvatarPopup from "./EditAvatarPopup.js"
import PopupProfileForm from "./EditProfilePopup.js"
import ImagePopup from './ImagePopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import InfoTooltip from './InfoTooltip.js'
import Register from "./Register.js";
import {checkResponse} from "../utils/auth.js";

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null);
  const [ currentUser, setCurrentUser ] = React.useState({})
  const [ cards, setCards ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen ] = React.useState(false);
  const [ isSuccessfulRegistration, setIsSuccessfulRegistration ] = React.useState(false);
  const [ userEmail, setUserEmail ] = React.useState('');
  const history = useHistory();


  React.useEffect(() => {
      if(loggedIn) {
          history.push('/')
      }
  }, [loggedIn, history])

  React.useEffect(() => {
      checkToken()
  }, []) // поправил useEffect

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards()
    ])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData)
          setCards(cardsData)
        })
        .catch((err) => console.log(err))
  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    console.log(isAddPlacePopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data){
    setIsLoading(true)
    api.setUserInfo(data)
        .then(userData => {
          setCurrentUser(userData)
          closePopups()
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(data){
    setIsLoading(true)
    api.addCard(data)
        .then(newCard => {
          setCards([newCard, ...cards])
          closePopups()
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(data){
    setIsLoading(true)
    api.updateAvatar(data)
        .then(avatar => {
          setCurrentUser(avatar)
          closePopups()
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  }

  function handleCardDelete(id) {
    api.deleteCard( id)
        .then(() => {
          setCards(cards.filter(c => c._id !== id))
        })
        .catch((err) => console.log(err))

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((addCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? addCard : c));
    })
        .catch((err) => console.log(err))
  }

  function closePopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false)
  }

    function handleLogin (email, password) {
        return auth.authorization(email, password)
            .then((data) =>{
                localStorage.setItem('token', data.token)
                setUserEmail(email) // сохранил email пользователя в state
                setLoggedIn(true)
                history.push('/')
            })
            .catch(err => console.log(`Не удалось войти ${err}.`))
    }

    function handleRegister (email, password) {
        return auth.register(email, password)
            .then((res) => {
                setIsInfoTooltipPopupOpen(true)
                setIsSuccessfulRegistration(true)
            })
            .catch(() => {
                setIsInfoTooltipPopupOpen(true)
                setIsSuccessfulRegistration(false)
            })
            .catch(err => console.log(`Не удалось зарегистрироваться ${err}.`))
    }

  function handleLogOut () {
      localStorage.removeItem('token')
      setLoggedIn(false)
      setUserEmail('')
      history.push('/sing-in')
  }

  function checkToken () {
      const token = localStorage.getItem('token')
      if(token) {
          auth.getToken(token)
              .then((res) => {
                  setUserEmail(res.data.email)
                  setLoggedIn(true)
              })
              .catch(err => console.log(`Не удалось передать токен ${err}.`))
      } else {
          console.log('У вас нет токена')
      }
  }


  return (
   <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
       <Header loggedIn={loggedIn} userEmail={userEmail} onLogOut={handleLogOut} />
        <Switch>
            <ProtectedRoute exact
                            path="/"
                            component={Main}
                            loggedIn={loggedIn}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
            />
            <Route exact path="/sign-up">
                <Register onRegister={handleRegister} />
            </Route>
            <Route exact path="/sign-in">
                <Login onLogin={handleLogin} />
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"/>}
            </Route>
        </Switch>
       <Footer />
         {loggedIn &&
            <>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopups} onNewAvatar={handleUpdateAvatar} />
                <PopupProfileForm isOpen={isEditProfilePopupOpen} onClose={closePopups} isLoading={isLoading} onNewUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopups} isLoading={isLoading} onAddCard={handleAddPlaceSubmit} />
                <ImagePopup card={selectedCard} onClose={closePopups} />
            </>
         }
         {
             <InfoTooltip isOpenPopup={isInfoTooltipPopupOpen} isRegistration={isSuccessfulRegistration} onClose={closePopups} />
         }
     </div>
   </CurrentUserContext.Provider>
);
}

export default App;
