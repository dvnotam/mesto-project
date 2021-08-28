const router = require('express').Router();
const {
  getCard, createCard, deleteCard, getLike, deleteLike,
} = require('../controllers/cards');
const {
  validationCreateCard, validationAddLikes, validationDeleteCard, validationDeleteLikes,
} = require('../middlewares/validators');

router.get('/', getCard);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationDeleteCard, deleteCard);
router.put('/:cardId/likes', validationAddLikes, getLike);
router.delete('/:cardId/likes', validationDeleteLikes, deleteLike);

module.exports = router;
