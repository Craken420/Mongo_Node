const Todo = require('../models/task-model'),
      User = require('../models/users-model')

const UserCtrl = {}

UserCtrl.getAllUsers = async function (req, res) {
    let users = await User.find();
    res.status(200).send(users)
}

UserCtrl.getUserByID = async function (req, res) {
    let user = await User.findById(req.params.userId);
    res.status(200).send(user)
}

UserCtrl.newUser = async function (req, res) {
    let user = await new User(req.body)
    await user.save();
    res.status(200).send({'message': 'User created!!!'})
}

UserCtrl.updateUser = async function (req, res) {
    await User.findByIdAndUpdate(req.params.userId, req.body)
    res.status(200).send({'message': 'User Edited!!!'})
}

UserCtrl.deleteUser = async function (req, res) {
    await User.findByIdAndRemove(req.params.userId)
    res.status(200).send({'message': 'User Removed!!!'})
}

module.exports = UserCtrl;
