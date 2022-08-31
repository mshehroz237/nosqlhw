const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true,
        maxlength:280,
        minlength:1,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
    },
    username:{
        type: String,
        required: true,
    },
    reactions:[
        reactionSchema
    ],

})

const Thought = model('Thought', thoughtSchema);
//creating a virtual to get reactions
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
}),


module.exports = Thought;