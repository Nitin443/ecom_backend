require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//app
const app = express();

// db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

//routes
app.get('/', (req, res) => {
    res.send("hello world");
});



// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server is started at port no. ' + port);
});
