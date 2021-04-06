const taskCtrl = {}

const Todo = require('../models/task-model');

// Callback function to avoid duplicating it all over
var callback = function (err, data) {
    if (err) { return console.error(err) }
    else { console.log(data) }
  }

// Create and save
taskCtrl.newTask = function (task) {
    var todo = new Todo({name: task.name, completed: false, note: task.note})
    todo.save(callback)
}

/* Querys */

    // Find all data in the Todo collection
    taskCtrl.showTaks = function () {
        Todo.find(callback)
    }

    // Get a Task by ID
    taskCtrl.getTaskById = function (id) {
        Todo.findById(id, callback)
    }

    // Get only completed tasks
    taskCtrl.getCompletTasks = function () {
        Todo.find({completed: true }, callback)
    }

    // Get all tasks ending with `JS`
    taskCtrl.getEndWithJS = function () {
        Todo.find({name: /JS$/ }, callback)
    }

/* Multi-Querys */

    // Get all tasks staring with `Master` and complete
    taskCtrl.getMastStartNComplet = function () {
        Todo.find({name: /^Master/, completed: true }, callback)
    }

    // Get all tasks staring with `Master`, not completed and created from year ago to now...
    const oneYearAgo = new Date();

    taskCtrl.getMastStartNoComplOfYearAgo = function () {
        oneYearAgo.setYear(oneYearAgo.getFullYear() - 1)
        Todo.find({name: /^Master/, completed: false })
        .where('updated_at').gt(oneYearAgo).exec(callback)
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
    taskCtrl.editTask = function (id, task) {
        Todo.findById(id, function (err, result) {
        if (err)
            console.log('err: ', err)
        else
            Todo.findByIdAndUpdate(id, {
            name: task.name,
            completed: task.completed,
            note: task.note}, callback)
        })
    }

    // Update multiple tasks from complete true to false
    taskCtrl.setFalseAllMaterTasks = function () {
        Todo.update({ name: /Master/ }, { completed: false }, { multi: true }, callback)
    }

    // Update one Mater task from complete true to false
    taskCtrl.setTrueAllMaterTasks = function () {
        Todo.findOneAndUpdate({name: /Master/ }, {completed: true}, callback);
    }

/* Delete */

    // Delete task by ID
    taskCtrl.deleteTask = function (id) {
        Todo.findByIdAndRemove(id, callback)
    }

    // Multi-Delete with multiple filter
    taskCtrl.deleteNewTask = function () {
        Todo.deleteMany({name: /New/, note: /No/}, callback)
    }

module.exports = taskCtrl
