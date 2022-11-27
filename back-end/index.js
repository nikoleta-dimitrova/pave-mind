const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const password = "FutureMilfsAndDilfs";
const port = 3000;

const accountRoutes = require('./routes/accountRoutes');

const app = express();
const db = mongoose.connection;

app.use(express.json());
app.use(cors({
    origin: "*"
}));

mongoose.connect(`mongodb+srv://PaveMind:${password}@pavemind.gattsus.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true });
db.on('error', (error) => { console.log(error) });
db.once('open', () => { console.log('Connected to MongoDB Cloud') });
app.listen(port, () => console.log("Server started on port: " + port));

app.use('/accounts', accountRoutes)
// app.use('/posts', accountRoutes)
// app.use('/diary', accountRoutes)