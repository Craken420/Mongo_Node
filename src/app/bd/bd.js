const mongoose = require('mongoose')

// Db connection
const dbURI = 'mongodb://localhost/todoAppTest'

mongoose.connect(dbURI).then(
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

// Create and save
const Todo = mongoose.model('Todo', TodoSchema);

// Create and save
const newTask = function (name, note) {
    var todo = new Todo({name: name, completed: false, note: note})

    todo.save(function (err){
        if (err) console.log(err)
        else console.log(todo)
    })
}

newTask('Add Task in Todo List', 'Todo task details')
