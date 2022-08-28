const { Thought } = require('../models');

const thoughtController = {

    //get all thoughts
    getAllthoughts(req,res){
        Thought.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);      
        })
    },
//get a thought by its id
    getThoughtById({ params }, res){
        Thought.findOne({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })
    },
    //create a thought
    createThought({body}, res){
        Thought.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    //find a thought and update it
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData =>{
            if(!dbUserData){
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    //find a thought and delete it
    deleteThought({params}, res) {
       Thought.findOneAndDelete({_id:params.id})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;