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

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredencials = async function(email, password) {
    // Search for a user by email and password.
    const user = await User.findOne({email});
    if (!user)
        throw new Error({ error: 'Invalid login credencials' });
    if (!password == user.password)
        throw new Error({ error: 'Invalid login credencials'});
    return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;