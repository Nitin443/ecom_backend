require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');

// import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const treeRoutes = require('./routes/tree');

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

// handle image upload
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null, true);
  }else{
      cb(null, false);
  }
};

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use(cors());


// middleware routes
app.use('/', authRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/tree', treeRoutes);





// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server is started at port no. ' + port);
});
