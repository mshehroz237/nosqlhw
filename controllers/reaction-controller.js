const { Thought, User, Reaction } = require('../models');

const reactionController = {
    //create a thought
    createReaction({ params, body }, res) {
             Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { reactions: body} },
              { new: true }
            )
          .then(dbReactionData => {
            if (!dbReactionData) {
              res.status(404).json({ message: 'No reaction found with this id!' });
              return;
            }
            res.json(dbReactionData);
          })
          .catch(err => res.json(err));
      },
      removeReaction({ params }, res) {
            Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { reactions: params.reactionId } },
              { new: true }
            )
          .then(deletedReaction => {
            if (!deletedReaction) {
              res.status(404).json({ message: 'No reaction found with this id!' });
              return;
            }
            res.json(deletedReaction);
          })
          .catch(err => res.json(err));
      }
}

module.exports = reactionController;