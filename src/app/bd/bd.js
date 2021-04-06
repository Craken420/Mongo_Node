const mongoose = require('mongoose')

// Db connection
const dbURI = 'mongodb://localhost/todoAppTest'

const dbOpc = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Create and save
const newTask = function (name, note) {
    var todo = new Todo({name: name, completed: false, note: note})

    todo.save(function (err){
        if (err) console.log(err)
        else console.log(todo)
    })
}

// Callback function to avoid duplicating it all over
var callback = function (err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
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

  getMastStartNComplet()