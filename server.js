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
      io = require('socket.io').listen(server);

server.listen( 4200, ()=> {console.log('Connected on 4200')})


app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'))
});


io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});
  });

});

/////////////
// DATABASE //
/////////////

massive("postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj").then(massiveInstance => {
  app.set('db', massiveInstance);
  const db = app.get('db');

  app.post('/api/add-user', (req, res) => {
    newUser = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.shopOwner ? "admin" : "user"
    ]
    db.add_user(newUser, (err, user) => {
      console.log(err)})
      .then((user) => {res.send(user)},
            (error) => {res.send({fail:'That email address is already in use!'})
    })
  })

  app.post('/api/login', (req, res)=> {
    credentials = [req.body.email, req.body.password]
    db.login(credentials, (err, user)=> {
      console.log(err);
    }).then((user) => {res.send(user)})
  })

  app.post('/api/test', (req, res) => {
    console.log('in test api')
    io.emit('news', { msg: 'Notified!' })
    db.test_end((err, users) => {}).then(users => {
      res.send(users)})
  })

  app.get('/api/alltrans', (req, res) => {
    db.transaction_template((err, trans) => {
      console.log(err);
    }).then(trans => res.send(trans))
  })

  app.post('/api/timecards', (req, res) => {
    console.log('getting timecards', req.body.id)
    db.timecards(req.body.id, (err, cards) => {}).then(cards => {
      res.send(cards)
      info = cards
      console.log('info ---', info)
      return info
    })
  })

  app.post('/api/shop-trans', (req, res) => {
    db.shop_trans(req.body.id, (err, trans) => {}).then(trans => res.send(trans))
  })

  app.post('/api/contacts', (req, res) => {
    db.getAllContacts(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/barbers', (req, res) => {
    db.get_barbers(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/edit-barber-pay', (req, res)=> {
    let changes = [
      req.body.type,
      req.body.rate,
      req.body.b_id
    ]
    console.log(changes);
    db.edit_barber_pay(changes, (err, changed)=> {console.log(err);}).then(changed => res.send(changed))
  })

  app.post('/api/delete/barber', (req, res)=> {
    console.log(req.body);
    db.delete_barber(req.body.id, (err, barber)=> {console.log(err);}).then(
      (pass) => {res.send({msg:"Success!"})},
      (fail) => {res.send({fail: "An error occurred."})})
  })

  app.post('/api/services', (req, res) => {
    db.get_services(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/add-contact', (req, res) => {
    let contact = [
      req.body.c_first,
      req.body.c_last,
      req.body.c_phone,
      req.body.c_email,
      req.body.b_day,
      req.body.c_shop
    ]
    db.add_contact(contact, (err, contacts) => {
      console.log(err, contacts);
    }).then((contact) => {res.send(contact)},
            (fail) => {res.send({fail:"An error occurred"})})
  })

  app.post('/api/edit-contact', (req, res)=> {
    let contact = [
      req.body.c_first,
      req.body.c_last,
      req.body.c_phone,
      req.body.c_email,
      req.body.b_day,
      req.body.c_id
    ]
    db.edit_contact(contact, (err, newContact)=> {console.log(err);})
    .then((newContact)=> {res.send(newContact)},
          (fail)=> {res.send({fail:"An error occurred"})})
  })

  app.post('/api/delete-contact', (req, res) => {
    console.log('server', req.body);
    db.delete_contact(req.body.c_id, (err, contacts) => {
      console.log("db", err, contacts);
    }).then(contacts => res.send({msg:"Success"}),
            fail => res.send({msg:"An error occurred"}))
  })

  app.post('/api/add-appt', (req, res) => {
    console.log('--adding appts--', req.body)
    let array = [
      req.body.barber_id,
      req.body.client_id,
      req.body.service_id,
      req.body.shop_id,
      req.body.start_time,
      req.body.end_time
    ]
    db.add_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => res.send(info))
  })

  app.post('/api/cal/delete', (req, res) => {
    let array = [req.body.a_id, req.body.shop_id]
    console.log('---delete request made---', array)
    db.delete_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => {
      res.send(info)
    })
  })

  app.post('/api/delete-request', (req, res) => {
    let array = [req.body.a_id, req.body.shop_id, "delete-request"]
    console.log('---delete request made---', array)
    db.delete_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => {
      io.emit('delete-request', { msg: 'A Barber has made a request to cancel an appointment' })
      res.send(info)
    })
  })

  app.post('/api/cal/edit', (req, res) => {
    console.log('--editing appts--', req.body)
    let array = [
      req.body.dataID,
      req.body.barber_id,
      req.body.client_id,
      req.body.service_id,
      req.body.shop_id,
      req.body.start_time,
      req.body.end_time
    ]
    db.edit_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => res.send(info))
  })

  app.post('/api/cal', (req, res) => {
    db.get_cal_events(req.body.id, (err, events) => {
      console.log('db', err, events);
    }).then(info => res.send(info))
  });

  app.post('api/start-appt', (req, res) =>{
    io.emit('appt-start', { msg: 'A appointment has been started' })
    db.start_appt(req.body.id, (err, appt) => {
      console.log('db', err, appt);
    }).then(info => res.send(info))
  })


  // NODE MAILER-----------------///
  // ---------------------------------

  var info
  app.post('/sendmail', (req, res)=> {
      var startEmail = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <title></title><style>
      table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
      }
      td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
      }
      table, th, td{
        border: 1px solid black;
      }
      tr:nth-child(even) {
          background-color: #dddddd;
      }
      </style>
      </head>
      <body>
      <table>
        <tr>
          <th>Barber</th>
          <th>Time In</th>
          <th>Time Out</th>
        </tr>`;
    var emailTmp

    var getStuff = function() {
      emailTmp = info.reduce(function(a, b) {
        return a + '<tr><td>' + b.b_first + ' ' + b.b_last + '</td><td>' + b.time_in + '</td><td>' + b.time_out + '</td></tr>';
      }, '');
      console.log('here is email Tmp', emailTmp)

      var server = email.server.connect({user: "ac12491@gmail.com", password: "W0rkhard!", host: "smtp.gmail.com", port: 465, ssl: true});
      console.log('email server connected');
      console.log(req.body);
      // send the message and get a callback with an error or details of the message that was sent
      server.send({
        text: "",
        from: "hairBy.com",
        to: req.body.email,
        subject: "Daily Report from hairBy!",
        attachment: [
          {
            data: `${startEmail}${emailTmp}</table></body></html>`,
            alternative: true
          }
        ]
      }, function(err, message) {
        if (err)
          console.log(err);
        else
          res.json({success: true, msg: 'sent'});
        }
      );
      console.log('made it');
      return emailTmp
    }
    getStuff()

  })

});




// var results = [ {
//   asin: 'B01571L1Z4',
//   url: 'domain.com',
//   favourite: false,
//   createdAt: '2016-11-18T19:08:41.662Z',
//   updatedAt: '2016-11-18T19:08:41.662Z',
//   id: '582f51b94581a7f21a884f40'
// },
// {
//   asin: 'B01IM0K0R2',
//   url: 'domain2.com',
//   favourite: false,
//   createdAt: '2016-11-16T17:56:21.696Z',
//   updatedAt: '2016-11-16T17:56:21.696Z',
//   id: 'B01IM0K0R2'
//  }];

// var content = results.reduce(function(a, b) {
//   return a + '<tr><td>' + b.asin + '</a></td><td>' + b.url + '</td><td>' + b.favourite + '</td><td>' + b.reatedAt + '</td></tr>';
// }, '');
