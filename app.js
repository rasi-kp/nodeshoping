var createError = require('http-errors');
var express = require ('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')
// const MongoClient = require('mongodb').MongoClient;

//require Routes
var db=require('./config/mongodbconn')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret:"key",cookie:{maxAge:60000}}))
// MongoClient.connect ('mongodb://127.0.0.1:27017/store', (err, client) => {
// console.log("sucess to connect");
// if (err) {
//     console.error('Error connecting to MongoDB:', err);
//     db.collection('product').find().toArray((err, result) => {
//       if (err) {
//         console.error('Error querying MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
//       console.log("hai rasi");
//       console.log(result);
//     });
//   }
// })
const oneDay = 1000 * 60 * 60 *.1;
app.use(session({
    secret: "rasisecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// db.connect((err)=>{
//   if(err) console.log("connection error"+err);
//   else console.log("Database connected");
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


