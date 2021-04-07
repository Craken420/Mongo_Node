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
