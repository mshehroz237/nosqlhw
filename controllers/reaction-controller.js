const { Thought, User, Reaction } = require('../models');

const reactionController = {
    //create a thought
    createReaction({ params, body }, res) {
        Reaction.create(body)
          .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params.id },
              { $push: { reactions: _id } },
              { new: true }
            );
          })
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
        Reaction.findOneAndDelete({ _id: params.reactionId })
          .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No reaction with this id!' });
            }
            return Thought.findOneAndUpdate(
              { _id: params.reactionId },
              { $pull: { reactions: params.reactionId } },
              { new: true }
            );
          })
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