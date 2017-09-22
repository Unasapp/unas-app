const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      config = require('./config.js'),
      cors = require('cors'),
      path = require('path'),
      http = require('http'),
      app = module.exports = express(),
      server = http.createServer(app),
      nodemailer = require('nodemailer'),
      email = require('emailjs/email'),
      io = require('socket.io')(server),
      server.listen( 4200, ()=> {console.log('Connected on 4200')})

app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '/dist', 'index.html'))
 });

// app.post('/sendmail', sendmail());

app.post('/sendmail', (req, res)=> {

  var server = email.server.connect({user: "ac12491@gmail.com", password: "W0rkhard!", host: "smtp.gmail.com", port: 465, ssl: true});
  console.log('email server connected');
  console.log(req.body);
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
    text: "",
    from: "hairBy.com",
    to: 'ac12491@gmail.com',
    subject: "Daily Report from hairBy!",
    attachment:
   [
      {data:"<h1>i <i>hope</i> this works!</h1><br><h4>i <i>hope</i> this works!</h4>", alternative:true}
   ]
  }, function(err, message) {
    if (err)
      console.log(err);
    else
      res.json({success: true, msg: 'sent'});
    }
  );
  console.log('made it');

})

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, '/dist', 'index.html'))
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

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
      }).then(contacts => res.send(contacts));
      pusher.trigger('my-channel', 'my-event', {
        "message": "hello world"
      });
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
