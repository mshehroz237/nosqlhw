const { Thought, User, Reaction } = require('../models');

const reactionController = {
    //create a reaction and then pushing it in the reactions inside thought schema
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
      // removing a reaction by finding it inside the thought and then removing the reaction using the reactionId from reaction
      removeReaction({ params }, res) {
            Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { reactions:{reactionId: params.reactionId} } },
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