const { User } = require('../models');

const UserController = {
    getAllUsers(req,res){
        User.find({})
        .populate({
            path:'thoughts, friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id:-1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);      
        })
    },


}