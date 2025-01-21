const express = require('express')
const connectDB = require('./config/DBConnection')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5051
const app = express();

const addSummaryUser = require('./routes/SummaryRoutes');
const getAllUsers = require('./routes/SummaryRoutes');
const addDetails = require('./routes/DetailsRoutes');

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectDB();

app.use('/add', addSummaryUser)
app.use('/get', getAllUsers)
app.use('/desc', addDetails)

app.listen(port, ()=> {
    console.log("Server listening on port ", port)
})