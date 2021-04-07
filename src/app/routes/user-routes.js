const express = require('express'),
      router = express.Router()

const UserCtrl = require('../controllers/user-controller')

router.route('/')
    .get(UserCtrl.getAllUsers)
    .post(UserCtrl.newUser);

router.route('/:userId')
    .get(UserCtrl.getUserByID)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

router.route('/:userId/todo')
    .get(UserCtrl.getUserTodo)
    .post(UserCtrl.newUserTask);

module.exports = router
