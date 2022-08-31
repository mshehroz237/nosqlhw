const { Thought, User} = require('../models');


const friendController = {
//creating a frined and then updating it in User by getting userid and then pushing it in the friend Array
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
      //Getting the userId and then oulling the frind from friends Array suing the friendId
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