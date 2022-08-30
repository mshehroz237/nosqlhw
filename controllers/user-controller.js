const { User } = require('../models');

const UserController = {

    //get all users
    getAllUsers(req,res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);      
        })
    },
//get a user by its id
    getUserById({ params }, res){
        User.findOne({_id: params.id})
        .populate({
        path:'thoughts',
        select: '-__v'
        })
        .populate({
        path:'friends',
        select: '-__v'
        })
        .select('-__v')
        .sort({_id:-1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })
    },
    //create a user
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    //find a user and update it
    updateUser({params, body}, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData =>{
            if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    //find a user and delete it
    deleteUser({params}, res) {
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = UserController;