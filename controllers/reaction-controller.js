const { Thought, User, Reaction } = require('../models');

const reactionController = {
    //create a thought
    createReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
          .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params._id },
              { $push: { reactions: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No reaction found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    //   removeReaction({ params }, res) {
    //     Reaction.findOneAndDelete({ _id: params.reactionId })
    //       .then(deletedReaction => {
    //         if (!deletedReaction) {
    //           return res.status(404).json({ message: 'No reaction with this id!' });
    //         }
    //         return Thought.findOneAndUpdate(
    //           { _id: params.reactionId },
    //           { $pull: { reactions: params.reactionId } },
    //           { new: true }
    //         );
    //       })
    //       .then(dbPizzaData => {
    //         if (!dbPizzaData) {
    //           res.status(404).json({ message: 'No pizza found with this id!' });
    //           return;
    //         }
    //         res.json(dbPizzaData);
    //       })
    //       .catch(err => res.json(err));
    //   }
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
          .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No reaction with this id!' });
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      }

}

module.exports = reactionController;