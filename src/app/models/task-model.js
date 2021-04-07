const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    impact: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Todo', TodoSchema)