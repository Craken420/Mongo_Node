const taskCtrl = {}

const Todo = require('../models/task-model')

// Create and save
taskCtrl.newTask = async function (req, res) {
    let todo = await new Todo(req.body)
    todo.completed = false;
    await todo.save()
    res.status(200).send({'message': 'CreateTask'});
}

/* Querys */

    // Find all data in the Todo collection
    taskCtrl.showTaks = async function (req, res) {
        let tasks = await Todo.find()
        res.json(tasks)
    }

    // Get a Task by ID
    taskCtrl.getTaskById = async function (req, res) {
        let task = await Todo.findById(req.params.id)
        res.json(task)
    }

    // Get only completed tasks
    taskCtrl.getCompletTasks = async function (req, res) {
        let tasks = await Todo.find({completed: true })
        res.status(200).send(tasks)
    }

    // Get all tasks ending with `JS`
    taskCtrl.getEndWithJS = async function (req, res) {
        let tasks = await Todo.find({name: /JS$/ })
        res.status(200).send(tasks)
    }

/* Logical Query Operators */
    taskCtrl.getSpecial = async function (req, res) {
        let tasks = await Todo.find( {
            $and: [
                {
                    $or: [
                        {
                            completed: false,
                            impact: {
                                $lt : 500,
                                $gt: 51,
                                $exists: true,
                                $nin: [ 310, 320 ]
                            }
                        },
                        {
                            completed: true,
                            impact : { $lt : 500 }
                        }
                    ]
                },
                {
                    name: {
                        $not: { $regex: "Beginer", $options: 'i' },
                        $in: [ /js$/i, /css$/i ]
                    }
                }
            ],
            $nor: [{ impact: 350 }]
        })
        res.status(200).send(tasks)
    }

/* Multi-Querys */

    // Get all tasks staring with `Master` and complete
    taskCtrl.getMastStartNComplet = async function (req, res) {
        let tasks = await Todo.find({name: /^Master/, completed: true })
        res.status(200).send(tasks)
    }

    // Get all tasks staring with `Master`, not completed and created from year ago to now...
    const oneYearAgo = new Date();

    taskCtrl.getPremNoComplOfYearAgo = async function (req, res) {
        oneYearAgo.setYear(oneYearAgo.getFullYear() - 1)
        let tasks = await Todo.find({name: /^Premium/, completed: false})
        .where('createdAt').gt(oneYearAgo)
        res.status(200).send(tasks)
    }

/*
* Update
* Model.update(conditions, update, [options], [callback])
* Model.findOneAndUpdate([conditions], [update], [options], [callback])
*/

    /*
    * Update task by ID
    * Example: editTask('606c91a17c08ea109c0e0eda',
    *   {name: 'New title task', completed: true, note: 'New note'})
    */
    taskCtrl.editTask = async function (req, res) {
        await Todo.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            completed: req.body.completed,
            note: req.body.note}, function (err, result) {
                if (err)
                    console.log('err: ', err)
            })
        res.send({'message': 'EditTask'})
    }

    // Update multiple tasks from complete true to false
    taskCtrl.setFalseAllMaterTasks = async function (req, res) {
        await Todo.update({ name: /Master/ }, { completed: false }, { multi: true })
        res.status(200).send({'message': 'EditedTasks'});
    }

    // Update one Mater task from complete true to false
    taskCtrl.setTrueFirstReactTasks = async function (req, res) {
        await Todo.findOneAndUpdate({name: /React/ }, {completed: true});
        res.status(200).send({"message": 'EditedTasks'});
    }

/* Delete */

    // Delete task by ID
    taskCtrl.deleteTask = async function (req, res) {
        await Todo.findByIdAndRemove(req.params.id)
        res.status(200).send({"message": 'DeleteTask'});
    }

    // Multi-Delete with multiple filter
    taskCtrl.deleteNewTasks = async function (req, res) {
        await Todo.deleteMany({name: /New/, note: /No/});
        res.status(200).send({"message": 'DeleteNewTasks'});
    }

module.exports = taskCtrl
