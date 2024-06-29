const express = require('express');
const router = express.Router();
const {
    getUserProfile, 
    updatePassword,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const {isAuthenticatedUser } = require('../middleware/auth');

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateUser);
router.route('/me/delete').delete(isAuthenticatedUser, deleteUser);


module.exports = router;

