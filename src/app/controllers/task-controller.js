const taskCtrl = {}

const Todo = require('../models/task-model')

// Create and save
taskCtrl.newTask = async function (req, res) {
    let todo = await new Todo(req.body)
    todo.completed = false

    await todo.save( (err) => {
        if (err) res.status(500).send(err.message);
        else res.status(200).send({'message': 'CreateTask'})
    })
}

/* Querys */

    // Find all data in the Todo collection
    taskCtrl.showTaks = async function (req, res) {
        await Todo.find( (err, tasks) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(tasks)
        })
      
    }

    // Get a Task by ID
    taskCtrl.getTaskById = async function (req, res) {
        await Todo.findById(req.params.id, (err, task) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(task)
        })
    }

    // Get only completed tasks
    taskCtrl.getCompletTasks = async function (req, res) {
        await Todo.find({completed: true }, (err, tasks) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(tasks)
        })
    }

    // Get all tasks ending with `JS`
    taskCtrl.getEndWithJS = async function (req, res) {
        await Todo.find({name: /JS$/}, (err, tasks) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(tasks)
        })
    }

/* Logical Query Operators */
    taskCtrl.getSpecial = async function (req, res) {
        await Todo.find( {
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
        }, (err, tasks) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(tasks)
        })
    }

/* Multi-Querys */

    // Get all tasks staring with `Master` and complete
    taskCtrl.getMastStartNComplet = async function (req, res) {
        await Todo.find({name: /^Master/, completed: true }, (err, tasks) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send(tasks)
        })
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
        await Todo.findByIdAndUpdate(req.params.id, req.body, (err) => {
                if (err) res.status(500).send(err.message);
                else res.status(200).send({'message': 'EditTask'})
            }
        )
    }

    // Update multiple tasks from complete true to false
    taskCtrl.setFalseAllMaterTasks = async function (req, res) {
        await Todo.update({ name: /Master/ }, { completed: false }, { multi: true },
            (err) => {
                if (err) res.status(500).send(err.message);
                else res.status(200).send({'message': 'EditedTasks'})
            })
    }

    // Update one Mater task from complete true to false
    taskCtrl.setTrueFirstReactTasks = async function (req, res) {
        await Todo.findOneAndUpdate({name: /React/ }, {completed: true}, (err) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send({'message': 'EditedTask'})
        });
    }

/* Delete */

    // Delete task by ID
    taskCtrl.deleteTask = async function (req, res) {
        await Todo.findByIdAndRemove(req.params.id, (err) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send({'message': 'DeleteTask'})
        })
    }

    // Multi-Delete with multiple filter
    taskCtrl.deleteNewTasks = async function (req, res) {
        await Todo.deleteMany({name: /New/, note: /No/}, (err) => {
            if (err) res.status(500).send(err.message);
            else res.status(200).send({'message': 'DeleteNewTasks'})
        })
    }

module.exports = taskCtrl
