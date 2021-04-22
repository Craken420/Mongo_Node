const mongoose = require('mongoose')

// Db connection
const dbOpc = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(process.env.MONGO_URL, dbOpc).then(
    () => {
      console.log("Database connection established!")
    },
    err => {
      console.log("Error connecting Database instance due to: ", err)
    }
)
