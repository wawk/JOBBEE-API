const express = require('express');
const router = express.Router();
const {
    getUserProfile, 
    updatePassword,
    updateUser,
    deleteUser,
    getAppliedJobs,
    getPublishedJobs,
    getUsers,
    deleteUserAdmin
} = require('../controllers/userController');
const {isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.use(isAuthenticatedUser);

router.route('/me').get(getUserProfile);
router.route('/jobs/applied').get( authorizeRoles('user'), getAppliedJobs);
router.route('/jobs/published').get( authorizeRoles('employer'), getPublishedJobs);
router.route('/password/change').put( updatePassword);
router.route('/me/update').put( updateUser);
router.route('/me/delete').delete( deleteUser);

// Admin only routes
router.route('/users').get( authorizeRoles('admin'),getUsers);
router.route('/user/:id').delete( authorizeRoles('admin'),deleteUserAdmin);


module.exports = router;

