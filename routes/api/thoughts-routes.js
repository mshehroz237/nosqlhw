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
    .get()
    .post();

// /api/thoughts/:id
    router
    .route('/:id')
    .get()
    .put()
    .delete();

// /api/thoughts/:thoughtId/reactions
router
.route(':thoughtId/reactions')
    .post(createReaction)
    .delete(removeReaction);

module.exports = router