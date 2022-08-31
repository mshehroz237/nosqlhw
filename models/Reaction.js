const { Schema, model, Types } = require('mongoose');
//using date format to display current date
const dateFormat = require('../utils/dateFormat');
//creating a reaction schema 
const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength:280,
    },
    username:{
    type: String,
    required: true,
    },
    createdAt:{
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal),
    }
})


module.exports = reactionSchema;