const express = require('express')
const app = express()
const cors = require("cors");


var corsOptions = {
    origin: "http://localhost:3001",
  };
  
app.use(cors(corsOptions));

require("./app/routes/search.route")(app);

const port = process.env.PORT || 3000
app.listen(port, err => {
  if (err) console.error(err)
  console.log(`App Listening on Port ${port}`)
})