const jwt = require('jsonwebtoken')

const mongoose = require('mongoose'),
      {Schema, model} = mongoose

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    tokens: [{
        token: {
            type: String,
             required: true
         }
    }]
},
{
    timestamps: true,
    versionKey: false
})

const User = mongoose.model('User', userSchema);

module.exports = User;