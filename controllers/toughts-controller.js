const { Thought, User, Reaction} = require('../models');

const thoughtController = {

    //get all thoughts
    getAllthoughts(req,res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);      
        })
    },
//get a thought by its id
    getThoughtById({ params }, res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err)
            res.sendStatus(400)
        })
    },
    //create a thought
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    //find a thought and update it
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData =>{
            if(!dbThoughtData){
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err))
    },
    //find a thought and delete it
    deleteThought({params}, res) {
       Thought.findOneAndDelete({_id:params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;