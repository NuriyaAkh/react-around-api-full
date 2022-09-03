import React, {useEffect, useState, useCallback} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import '../index.css';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { checkToken} from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [toDeleteCard, setToDeleteCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isInfoToolPopupOpen, setInfoToolPopupOpen] = React.useState(false);
  const [isInfoToolStatus, setInfoToolStatus] = React.useState('');

  const verifyToken = useCallback(() => {
    const userToken = localStorage.getItem('jwt');

    if (userToken) {
      checkToken(userToken)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          // if token is invalid, user will be logged out, no error needs to be displayed to the user
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  //get user data
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken && isLoggedIn) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) =>
          console.error(`Error while loading profile info: ${err}`)
        );
    }
  }, [isLoggedIn]);

  //get cards data
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    if (userToken && isLoggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) =>
          console.error(`Error while executing cards data: ${err}`)
        );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const userToken = localStorage.getItem('jwt');
    // console.log(userToken);
    if (userToken) {
      auth
        .checkToken(userToken)
        .then((res) => {
          if (res) {
            
            setIsLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  const onRegister = ({email, password}) => {
    auth
      .register({email, password})
      .then((res) => {
        if (res.data._id) {
          setInfoToolStatus('success');
          history.push('/signin');
        } else {
          setInfoToolStatus('fail');
        }
      })
      .catch((err) => {
        setInfoToolStatus('fail');
      })
      .finally(() => {
        setInfoToolPopupOpen(true);
      });
  };

  const onLogIn = ({email, password}) => {
    auth
      .login({email, password})
      .then((res) => {
        
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          setEmail(email);
          localStorage.setItem('email', email);
          history.push('/');
        } else {
          setInfoToolStatus('fail');
        }
      })
      .catch((err) => {
        setInfoToolStatus('fail');
      })
      .finally(() => {
        setInfoToolPopupOpen(true);
      });
  };
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleImageClick(card) {
    setSelectedCard(card);
  }
  function handleDeleteClick(card) {
    setConfirmationPopupOpen(true);
    setToDeleteCard(card);
  }
  function handleCardLike(card) {
    //Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.error(`Error while executing: ${err}`));
  }
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id, localStorage.getItem('jwt'))

      .then(() => {
        setCards(cards.filter((deletedCard) => deletedCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.error(`Error while deleting: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateUser(userUpdate) {
    setIsLoading(true);
    api
      .editProfileInfo(userUpdate, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error while executing: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(avatarUpdate) {
    setIsLoading(true);
    api
      .editProfilePicture(avatarUpdate, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error while executing: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceCard(newCard) {
    setIsLoading(true);
    api
      .addNewCard(newCard, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error while adding new card: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setInfoToolPopupOpen(false);
  }
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function onLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/signin');
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onLogOut={onLogOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardDelete={handleDeleteClick}
              onCardClick={handleImageClick}
              onCardLike={handleCardLike}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogIn={onLogIn} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoToolPopupOpen}
          status={isInfoToolStatus}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdate={handleUpdateUser}
          onClose={closeAllPopups}
          buttonText={isLoading ? 'Saving...' : 'Save'}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdate={handleUpdateAvatar}
          onClose={closeAllPopups}
          buttonText={isLoading ? 'Saving...' : 'Save'}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onUpdate={handleAddPlaceCard}
          onClose={closeAllPopups}
          buttonText={isLoading ? 'Creating...' : 'Create'}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onUpdate={handleCardDelete}
          onClose={closeAllPopups}
          card={toDeleteCard}
          buttonText={isLoading ? 'Deleting...' : 'Yes'}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
