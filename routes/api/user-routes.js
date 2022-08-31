const router = require('express').Router();

const{
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');
const{
    createFriend,
    removeFriend
} = require('../../controllers/friends-controller')

// /api/users/
router
    .route('/')
    .get()
    .post();
// /api/user/:id
    router
    .route(':/id')
    .get()
    .put()
    .delete();

// /api/users/:userId/friends/:friendId
router
.route('userId/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend);

module.exports = router;