var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

const signup = require('../config/mongodbconn');
const productdata = require('../config/productfetch');

let currentuser={};
//Authendiaction is isAuth

const isAuth = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/')
  }
};
//Main Route
router.get('/', (req, res, next) => {
  let user = req.session.user
  
  console.log(req.session.loggedIn)
  if (req.session.loggedIn) {
    res.redirect('/home');
  } else {
    res.render('login');
  }
});

/* GET home page. */
router.get('/home', isAuth, async(req, res, next) => {
  const username = await signup.findOne({ email: currentuser })
  const data = await productdata.find({});
  console.log(username.name);
  res.render('home', { username:username.name, items: data });
});

//post home page login sucess post data
router.post('/home', async (req, res) => {

  const usercheck = await signup.findOne({ email: req.body.email })
  
  if(!req.body.email || !req.body.password){
    res.render('login', { errorMessage: "Pls Enter the details" })
  }
  else if (!usercheck) {
    res.render('login', { errorMessage: 'Invalied Email ID' });
  }
  else{
    const passwordmatch=await bcrypt.compare(req.body.password,usercheck.password)
    if(passwordmatch){
      req.session.loggedIn = true;
      req.session.user = req.body;
      currentuser=req.body.email;
      console.log(currentuser);
      console.log(req.session) 
      res.redirect('/home');
    }
    else{
      res.render('login', { errorMessage: "Invalied Password" });
    }
  }
});
router.get('/order', isAuth, (req, res) => {
  res.render('order');
})
//logout session clear and back to login page
router.get('/logout', isAuth, (req, res) => {
  req.session.destroy()
  // res.setHeader('Cache-Control', 'no-store');
  // res.setHeader('Pragma', 'no-cache');
  // res.setHeader('Expires', '0');
  // res.locals.isLoggedIn = true;

  return res.redirect('/')
})


router.get('/signup', (req, res) => {
  res.render('signup')
})
//signup form setup
router.post('/signup', async (req, res) => {
  const datas = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  const existuser = await signup.findOne({ name: req.body.name })
  const existemail = await signup.findOne({ email: req.body.email })
  
  if (existuser) {
    console.log(existuser)
    res.render('signup', { errorMessage: "Username Already Exist" })
  }
  else if (existemail) {
    res.render('signup', { errorMessage: "Email Already Exist" })
  }
  else if(!existemail || !existuser){
    res.render('signup', { errorMessage: "Pls Enter the details" })
  }
  else {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(req.body.password, saltRounds)
    datas.password = hashpassword
    const result = await signup.insertMany(datas)
    console.log('Data inserted successfully:' + result);
    res.redirect('/')
  }
})

router.get('/test1', function (req, res, next) {
  const dummyItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  res.render('test1', { items: dummyItems })
})
router.get('/test2', function (req, res, next) {
  const dummyData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 22 },
    { id: 4, name: 'John Doe', age: 25 },
    { id: 5, name: 'Jane Smith', age: 30 },
    { id: 6, name: 'Bob Johnson', age: 22 },
    { id: 7, name: 'John Doe', age: 25 },
    { id: 8, name: 'Jane Smith', age: 30 },
    { id: 9, name: 'Bob Johnson', age: 22 },
    { id: 10, name: 'John Doe', age: 25 },
    { id: 11, name: 'Jane Smith', age: 30 },
    { id: 12, name: 'Bob Johnson', age: 22 },
  ];
  res.render('test2', { data: dummyData });
})
router.get('/if', function (req, res, next) {
  const dummyItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  res.render('if', { items: dummyItems, flag: false })
})

module.exports = router;
