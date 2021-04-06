const mongoose = require('mongoose')

// Db connection
const dbURI = 'mongodb://localhost/todoAppTest'

const dbOpc = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(dbURI, dbOpc).then(
    () => {
      console.log("Database connection established!")
    },
    err => {
      console.log("Error connecting Database instance due to: ", err)
    }
)

// Model to doing querys in bd
const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
})

const Todo = mongoose.model('Todo', TodoSchema);

// Callback function to avoid duplicating it all over
var callback = function (err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
}

// Create and save
const newTask = function (task) {
    var todo = new Todo({name: task.name, completed: false, note: task.note})
    todo.save(callback)
}

/* Querys */

  // Find all data in the Todo collection
  const showTaks = function () {
    Todo.find(callback)
  }

  // Get only completed tasks
  const getCompletTasks = function () {
    Todo.find({completed: true }, callback)
  }

  // Get all tasks ending with `JS`
  const getEndWithJS = function () {
    Todo.find({name: /JS$/ }, callback)
  }

/* Multi-Querys */

  // Get all tasks staring with `Master` and complete
  const getMastStartNComplet = function () {
    Todo.find({name: /^Master/, completed: true }, callback)
  }

  // Get all tasks staring with `Master`, not completed and created from year ago to now...
  const oneYearAgo = new Date();

  const getMastStartNoComplOfYearAgo = function () {
    oneYearAgo.setYear(oneYearAgo.getFullYear() - 1)
    Todo.find({name: /^Master/, completed: false })
      .where('updated_at').gt(oneYearAgo).exec(callback)
  }

  // Get a Task by ID
  const getTaskById = function (id) {
    Todo.findById(id, callback)
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
  const editTask = function (id, task) {
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
  const setFalseAllMaterTasks = function () {
    Todo.update({ name: /Master/ }, { completed: false }, { multi: true }, callback)
  }

  // Update one Mater task from complete true to false
  const setTrueAllMaterTasks = function () {
    Todo.findOneAndUpdate({name: /Master/ }, {completed: true}, callback);
  }

/* Delete */

  // Delete task by ID
  const deleteTask = function (id) {
    Todo.findByIdAndRemove(id, callback)
  }

  // Multi-Delete with multiple filter
  const deleteNewTask = function () {
    Todo.deleteMany({name: /New/, note: /No/}, callback)
  }

  // newTask({name: 'New Task café', note: 'No Note'})
  // newTask({name: 'New Task cafe', note: 'No Note'})
  // newTask({name: 'New Task cafE', note: 'No Note'})
  // newTask({name: 'New Task lo', note: 'No Note'})
  // newTask({name: 'New Task ik', note: 'No Note'})
  deleteNewTask()
