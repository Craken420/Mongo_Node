const mongoose = require('mongoose'),
      {Schema, model} = mongoose

const userSchema = Schema({
    name: String,
    email: String,
    password: String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema);