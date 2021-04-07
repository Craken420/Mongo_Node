const mongoose = require('mongoose'),
      {Schema, model} = mongoose
  
const TodoSchema = new Schema({
    name: String,
    completed: Boolean,
    note: String,
    impact: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Todo', TodoSchema)