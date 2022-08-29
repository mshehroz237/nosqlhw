const { Thought, User, Reaction} = require('../models');


const friendController = {

    createFriend({ params, body }, res) {
        console.log(body);
        User.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params._id },
              { $push: { friends: _id } },
              { new: true }
            );
          })
          .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.json(err));
      },
      removeFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.friendId })
          .then(dbFriendData => {
            if (!dbFriendData) {
              return res.status(404).json({ message: 'No reaction with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.friendId },
              { $pull: { friends: params.friendId } },
              { new: true }
            );
          })
          .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.json(err));
      }

}

module.exports = friendController;