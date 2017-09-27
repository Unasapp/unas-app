const express = require('express'),
  path = require('path')
session = require('express-session'),
bodyParser = require('body-parser'),
massive = require('massive'),
passport = require('passport'),
Auth0Strategy = require('passport-auth0'),
config = require('./config.js'),
cors = require('cors'),
http = require('http'),
nodemailer = require('nodemailer'),
email = require('emailjs/email');

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
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'))
});

// console.log(__dirname);
// console.log(__dirname + '/dist/index.html');

/////////////
// DATABASE //
/////////////

massive("postgres://uunjpeyj:yVNsIpBpaTMB_a2TXEss-Gmq1DGSIOte@pellefant.db.elephantsql.com:5432/uunjpeyj").then(massiveInstance => {
  app.set('db', massiveInstance);
  const db = app.get('db');
  var info

  app.get('/api/test', (req, res) => {
    console.log('in test api', req)
    db.test_end((err, users) => {}).then(users => res.send(users))
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

  app.post('/api/services', (req, res) => {
    db.get_services(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/add-contact', (req, res) => {
    let contact = [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email, 1]
    db.add_contact(contact, (err, contacts) => {
      console.log(err, contacts);
    }).then(contacts => res.send(contacts))
  })

  app.post('/api/delete-contact', (req, res) => {
    console.log('server', req.body);
    db.delete_contact(req.body, (err, contacts) => {
      console.log("db", err, contacts);
    }).then(contacts => res.send(contacts))
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
    console.log('---deleteing appt from DB---', array)
    db.delete_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => res.send(info))
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

  app.post('/sendmail', (req, res) => {

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
        return a + '<tr><td>' + b.b_first + ' ' + b.b_last + '</td><td>' + b. in + '</td><td>' + b.out + '</td></tr>';
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

const server = http.createServer(app);
server.listen(4200, () => {
  console.log('Connected on 4200')
})
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
