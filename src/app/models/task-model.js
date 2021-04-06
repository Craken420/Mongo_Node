const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now },
  })

module.exports = mongoose.model('Todo', TodoSchema)