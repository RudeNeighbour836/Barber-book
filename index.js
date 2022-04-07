const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const filename = 'details.json';
const urlEncodedParser = bodyParser.urlencoded({extended: false});

let rawData = fs.readFileSync(filename);
let data = JSON.parse(rawData);


app.set('views','pages');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', function(request, response){
    response.render('Barber_Black_Sheep');
});
app.get('/view_booking', function(request, response){
    response.render('view_reservation');
});

app.get('/book', function(request, response){
    data.sort((a, b, c, d) =>(a.name > b.name > c.name > d.name)? 1 : -1);
    response.send(data);
});

app.post('/view_booking', function(request, response){
    const fs = require('fs');
    const path = require('path');
   
    data = fs.readFileSync(filename);
    last= data[Object.keys(data).pop()];
   
    response.render('view_reservation', last);
});

app.post('/book', urlEncodedParser,function(request, response){
    
    const fs = require('fs');
    const path = require('path');

    let newbooking =
        {
            name: request.body.booker_name,
            number: request.body.booker_number,
            service: request.body.service,
            date: request.body.date,
        };

    data.push(newbooking);
    fs.writeFileSync(filename,JSON.stringify(data, null, 2));
    response.render('booking_confirmation', newbooking);
});

app.listen(port);
console.log(`Server is listening on port ${port}`);












if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  
  http = require('http')
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config').initialize
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/landing', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/index.ejs',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/login')
    }
    next()
  }
  
  app.listen(3001)
  console.log('listening to port 3001')