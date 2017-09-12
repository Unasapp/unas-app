const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors'),
      http = require('http')

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/dist'));

// console.log(__dirname);
// console.log(__dirname + '/dist/index.html');


/////////////
// DATABASE //
/////////////

massive("postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj").then(massiveInstance => {
    app.set('db', massiveInstance);
    const db = app.get('db');

    app.get('/api/test', (req,res) => {
      db.test_end((err, users) => {
      }).then(users => res.send(users))
    })

    app.get('/api/alltrans', (req, res) => {
      db.transaction_template((err, trans) => {
        console.log(err);
      }).then(trans => res.send(trans))
    })

    app.post('/api/timecards', (req, res) => {
      db.timecards(req.body.id, (err, cards) => {
      }).then(cards => res.send(cards))
    })

    app.post('/api/shop-trans', (req, res) => {
      db.shop_trans(req.body.id, (err, trans) => {
      }).then(trans => res.send(trans))
    })

    app.post('/api/contacts', (req, res) => {
      db.getAllContacts(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/barbers', (req, res) => {
      db.get_barbers(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/services', (req, res) => {
      db.get_services(req.body.id, (err, contacts)=> {
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/add-contact', (req, res)=> {
      let contact = [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email, 1]
      db.add_contact(contact, (err, contacts) => {
        console.log(err, contacts);
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/delete-contact', (req, res)=> {
      console.log('server', req.body);
      db.delete_contact(req.body, (err, contacts) => {
        console.log("db", err, contacts);
      }).then(contacts => res.send(contacts))
    })

    app.post('/api/apptdialog', (req, res)=> {
      db.get_appt_dialog(req.body, (err, info)=> {
        console.log('db', err, info)
      }).then(info => res.send(info))
    })

    app.post('/api/cal', (req, res)=> {
      console.log('server');
      db.get_cal_events(req.body.id, (err, events)=> {
        console.log('db', err, events);
      }).then(info => res.send(info))
    })

});



///AUTH0///
//-------//

passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  config.auth0.callbackURL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        if (profile.name.familyName && profile.name.givenName) {
          var data =
          [
            profile.displayName,
            profile.id,
            profile.nickname,
            profile.name.givenName,
            profile.picture
          ]
        }
        else {
          var data =
          [
            profile.displayName,
            profile.id,
            profile._json.user_metadata.nickname,
            profile._json.user_metadata.name,
            'http://clipground.com/images/penguin-face-clipart-12.jpg'
          ]
        }
        db.createUserByAuth(data, function(err, user) {
          if(err){
            console.log(err);
          }
          console.log('USER CREATED', user);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  // var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, userA); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  // var userC = userC;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userB); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


//**************************//
//To force specific provider://
//**************************//
// app.get('/login/google',
//   passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
//   res.redirect("/");
// });

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

const server = http.createServer(app);
server.listen( 4200, ()=> {console.log('Connected on 4200')})
