require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

//app
const app = express();

// db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true}, (err) => {
    if(err){
        console.log('Database not connected');
    }else{
        console.log('Database connected');
    }

});

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// middleware routes
app.use('/', authRoutes);
app.use('/category', categoryRoutes);





// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server is started at port no. ' + port);
});
