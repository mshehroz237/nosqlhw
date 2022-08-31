const router = require('express').Router();

const{
    getAllthoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/toughts-controller');

const{
    createReaction,
    removeReaction
} = require('../../controllers/reaction-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllthoughts)
    .post(createThought);

// /api/thoughts/:id
    router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router