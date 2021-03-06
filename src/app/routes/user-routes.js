const express = require('express'),
      router = express.Router()

const UserCtrl = require('../controllers/user-controller')
const middleware = require('../middlewares/middleware')

router.post('/login', UserCtrl.login);

router.post('/signin', UserCtrl.signin);

router.use(middleware.authToken);

router.post('/logout', UserCtrl.logout);
router.post('/logoutAll', UserCtrl.logoutAll);

router.get('/me',  async(req, res) => res.send(req.user)); // View logged in user profile

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
