const { Thought, User} = require('../models');


const friendController = {

    createFriend({ params, body }, res) {
             User.findOneAndUpdate(
              { _id: params.userId},
              { $push: { friends: params.friendId } },
              { new: true }
            )
          .then(dbFriendData => {
            console.log(dbFriendData)
            if (!dbFriendData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => {
            console.log(dbFriendData)
            res.json(err)});
      },
      removeFriend({ params }, res) {
            User.findOneAndDelete(
              { _id: params.userId },
              { $pull: { friends: params.friendId } },
              { new: true }
            )
          .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.json(err));
      }

    }

module.exports = friendController;