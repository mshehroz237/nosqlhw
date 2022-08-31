const router = require('express').Router();

const{
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers
} = require('../../controllers/user-controller');
const{
    createFriend,
    removeFriend
} = require('../../controllers/friends-controller')

// /api/users/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
// /api/user/:id
    router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend);

module.exports = router;