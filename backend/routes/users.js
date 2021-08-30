const router = require('express').Router();
const {
  getUser, getUserById, updateAvatar, updateUser, getCurrentUser,
} = require('../controllers/users');
const { validationUserId, validationUserUpdate, validationAvatar } = require('../middlewares/validators');

router.get('/', getUser);
router.get('/user/:userId', validationUserId, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', validationUserUpdate, updateUser);
router.patch('/me/avatar', validationAvatar, updateAvatar);

module.exports = router;
