const Todo = require('../models/task-model'),
      User = require('../models/users-model')

const UserCtrl = {}

UserCtrl.getAllUsers = async function (req, res) {
    await User.find( (err, users) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).send(users)
    })
}

UserCtrl.getUserByID = async function (req, res) {
    await User.findById(req.params.userId, (err, user) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).send(user)
    })
}

UserCtrl.newUser = async function (req, res) {
    try {
        let user = new User(req.body);
        await user.save();
        res.status(200).send({user})
    }
    catch (err) {
        res.status(500).send(err.message)
    };
}

UserCtrl.updateUser = async function (req, res) {
    await User.findByIdAndUpdate(req.params.userId, req.body, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).send({'message': 'User Edited!!!'})
    })
}

UserCtrl.deleteUser = async function (req, res) {
    await User.findByIdAndRemove(req.params.userId, (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).send({'message': 'User Removed!!!'})
    })
}

UserCtrl.getUserTodo = async function (req, res) {
    let userTodo = await User.findById(req.params.userId).populate('todo')
    res.status(200).send(userTodo)
}

UserCtrl.newUserTask = async function (req, res) {
    let todo = await new Todo(req.body)
    todo.completed = false
    let user = await User.findById(req.params.userId)
    todo.user = user
    await todo.save()

    user.todo.push(todo)
    await user.save()

    res.status(200).send({'message': 'CreateTask'});
}

UserCtrl.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredencials(email, password);
        if (!user)
            return res.status(401).send({
                error: 'Login failed! Check authentication credentials'});
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

UserCtrl.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send('Logged Out');
    } catch(error) {
        res.status(500).send(error);
    }
};

UserCtrl.logoutAll = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send('All Logged Out')
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = UserCtrl;
