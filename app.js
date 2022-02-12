require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// import routes
const userRoutes = require('./routes/user');

//app
const app = express();

// db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

// middleware routes
app.use('/', userRoutes);





// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server is started at port no. ' + port);
});
