const mongoose = require('mongoose')

// Db connection
const dbOpc = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
}

mongoose.connect(process.env.MONGOATLAS_URL, dbOpc).then(
    () => {
      console.log("Database connection established!")
    },
    err => {
      console.log("Error connecting Database instance due to: ", err)
    }
)
