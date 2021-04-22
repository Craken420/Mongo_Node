const mongoose = require('mongoose'),
      {Schema, model} = mongoose
  
const TodoSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    completed: Boolean,
    note: {
      type: String,
      required: true
    },
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