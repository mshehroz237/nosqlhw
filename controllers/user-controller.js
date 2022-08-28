const { User } = require('../models');

const UserController = {
    getAllUsers(req,res){
        User.find({})
        .populate({
            path: 'thought','friend'
        })
    }
}