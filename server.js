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
      CronJob = require('cron').CronJob;
      moment = require('moment');

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

// USER/LOGIN endpoints
// ------------------------------------------------
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

  app.post('/api/testing1', (req,res)=>{
    console.log('server side testing');
  })

  app.post('/api/login', (req, res)=> {
    credentials = [req.body.email, req.body.password]
    db.login(credentials, (err, user)=> {
      console.log(err);
    }).then((user) => {res.send(user)})
  })

  app.post('/api/ionic-login', (req, res)=> {
    credentials = [req.body.userName, req.body.password]
    db.login_barber(credentials, (err, user)=> {
      console.log(err);
    }).then((user) => {res.send(user)})
  })

  app.post('/api/test', (req, res) => {
    io.emit('news', { msg: 'Notified!' })
    console.log('in test api')
    db.test_end((err, users) => {}).then(users => {

      res.send(users)})
  })

  app.get('/api/alltrans', (req, res) => {
    db.transaction_template((err, trans) => {
      console.log(err);
    }).then(trans => res.send(trans))
  })

  app.post('/api/timecards', (req, res) => {
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    console.log('getting timecards', array)
    db.timecards(array, (err, cards) => {}).then(cards => {
      // console.log("timecards", cards);
      res.send(cards)
    })
  })

  app.post('/api/timecards/delete', (req, res) => {
    console.log('--- deleting  timecards ---', req.body.id)
    db.timecardsDelete([req.body.id,0], (err, cards) => {}).then(cards => {
      console.log('--- deleting  timecards complete ---')
      res.send(cards)
    })
  })

  app.post('/api/timecards/save', (req, res) => {
    let array = [
      req.body.t_id,
      req.body.time_in,
      req.body.time_out
    ]
    // console.log('--- saving  timecards ---', array)
    db.timecardsSave(array, (err, cards) => {}).then(cards => {
      console.log('--- saving  timecards complete ---')
      res.send(cards)
    })
  })

  app.post('/api/post-timecards', (req, res)=> {
    // console.log('here is the timecards', req.body);

    let newTimecard = [
      req.body.userId,
      req.body.timeIn,
      req.body.timeOut,
      req.body.shopId
    ]

    db.post_timecards(newTimecard, (err, info)=> {
      // console.log('-- timecard added to server --',err,info);
    }).then(info => res.send(info))
  })

  app.post('/api/shop-trans', (req, res) => {
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    db.shop_trans(array, (err, trans) => {}).then(trans =>{
      res.send(trans)
    })
  })

// ??????????????????????????????????????????????????????????
  app.post('/api/shop-trans/earnings',(req, res) => {
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    // console.log('earnings in',array)
    db.trans_earnings(array, (err, trans) => {}).then(trans => {
      // console.log('--- earnings back 😡  ----',trans)
      res.send(trans)
    })
  })

  app.post('/api/shop/wages',(req, res) => {
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    // console.log('earnings in',array)
    db.get_shop_wages(array, (err, trans) => {}).then(trans => {
      // console.log('--- shop wages 😡  ----',trans)
      res.send(trans)
    })
  })

  app.post('/api/delete-trans', (req, res) =>{
    // console.log('-- deleting appt --',[req.body.id,"deleted"])
    db.shop_deletedtrans([req.body.id,"deleted"], (err, trans) => {}).then(trans =>{
      console.log('done deleting')
       res.send(trans)
      })
  })

  app.post('/api/edit-trans',(req,res) =>{
    array = [
      req.body.a_id,
      req.body.tip,
      req.body.pay_mth,
      req.body.total
    ]
    // console.log('--- Edit Trans CALLED ---- >>>',array)
    db.shop_edittrans(array,(err,trans)=>{}).then(trans =>{
      console.log('editing tran complete')
      res.send(trans)
    })

  })

  app.post('/api/contacts', (req, res) => {
      // console.log('this has worked')
    db.getAllContacts(req.body.id, (err, contacts) => {}).then((contacts) => {
      // console.log('this has worked')
      res.send(contacts)
    })
  })

  app.post('/api/barbers', (req, res) => {
    db.get_barbers(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/add-barber', (req, res) => {
    // first_name, last_name, email, password, color, phonenumber, shop_id
    newUser = [
      req.body.firstName,
      req.body.lastName,
      req.body.userName,
      req.body.password,
      'grey',
      req.body.phonenumber,
      1,
      '$15/hr',
      'hourly'
    ]
    // console.log('-- new barber created --', newUser)
    db.add_barber(newUser, (err, users) => {
      console.log('back from db -->>',err,users)})
      .then((users) => {
        // console.log('-- barber from DB --',users)
        res.send(users)
      },
      (error) => {
        console.log(error)
        res.send({fail:'That email address is already in use!'})
    })
  })

  app.post('/api/edit-barber-pay', (req, res)=> {
    let changes = [
      req.body.type,
      req.body.rate,
      req.body.b_id
    ]
    // console.log(changes);
    db.edit_barber_pay(changes, (err, changed)=> {console.log(err);}).then(changed => res.send(changed))
  })

  app.post('/api/delete/barber', (req, res)=> {
    // console.log(req.body);
    db.delete_barber(req.body.id, (err, barber)=> {console.log(err);}).then(
      (pass) => {res.send({msg:"Success!"})},
      (fail) => {res.send({fail: "An error occurred."})})
  })

  /////////Services Endpoints//////////

  app.post('/api/services', (req, res) => {
    db.get_services(req.body.id, (err, contacts) => {}).then(contacts => res.send(contacts))
  })

  app.post('/api/add-service', (req, res) => {
    // console.log(req.body);
    let newService = [
      req.body.service,
      req.body.price,
      req.body.est_time,
      req.body.shop_id
    ]
    db.add_service(newService, (err, service) => {
      // console.log(err, service);
    }).then((newService) => {res.send(newService)})
  })

  app.post('/api/delete-service', (req, res) => {
    // console.log('inside delete', req.body)
    db.delete_service(req.body.v_id, (err, service) => {
      // console.log("db", err, service);
    }).then((service) => {res.send(service)})
  })

  app.post('/api/edit-service', (req, res) => {
    // console.log('inside edit', req.body);

    let editService = [
      req.body.service,
      req.body.price,
      req.body.est_time,
      req.body.v_id
    ]
    db.edit_service(editService)
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
      // console.log(err, contacts);
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
    // console.log('server', req.body);
    db.delete_contact(req.body.c_id, (err, contacts) => {
      // console.log("db", err, contacts);
    }).then(contacts => res.send({msg:"Success"}),
            fail => res.send({msg:"An error occurred"}))
  })

// CALENDER endpoints
// -----------------------------------------------

  app.post('/api/add-appt', (req, res) => {
    console.log('--adding appts--', req.body)
    let array = [
      req.body.barber_id,
      req.body.client_id,
      req.body.service_id,
      req.body.shop_id,
      req.body.start_time,
      req.body.end_time,
      req.body.service_id2,
      req.body.service_id3
    ]
    db.add_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => res.send(info))
  })

  app.post('/api/cal/delete', (req, res) => {
    let array = [req.body.a_id, req.body.shop_id]
    // console.log('---delete request made---', array)
    db.delete_appt(array, (err, info) => {
      // console.log('db', err, info)
    }).then(info => {
      res.send(info)
    })
  })

  app.post('/api/cal/edit', (req, res) => {
    // console.log('--editing appts--', req.body)
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
      // console.log('db', err, info)
    }).then(info => res.send(info))
  })

  // Getting appts for entire Cal
  app.post('/api/cal', (req, res) => {
    db.get_cal_events(req.body.id, (err, events) => {
      console.log('db', err, events);
    }).then(info => res.send(info))
  });

  // NOTIFICATION/CASHOUT endpoints
  // -----------------------------------------------------

  app.post('/api/in-progress', (req, res)=> {
    db.in_progress(req.body.id, (err, events) => {
      console.log('db', err, events);
    }).then(info => res.send(info))
  })

  app.post('/api/delete-request', (req, res) => {
    let array = [req.body.a_id, req.body.shop_id, "delete-request"]
    // console.log('---delete request made---', array)
    db.delete_appt(array, (err, info) => {
      console.log('db', err, info)
    }).then(info => {
      io.emit('delete-request', { msg: 'A Barber has made a request to cancel an appointment' })
      res.send(info)
    })
  })

  app.post('/api/get-delete-requests', (req, res) => {
    db.get_delete_requests(req.body.id, (err, info) => {
    }).then(info => {
      res.send(info)
    })
  })

  app.post('/api/start-appt', (req, res) => {
    // console.log('endpoint hit', req.body);
    db.update_appt([req.body.a_id,'in-progress'], (err, appt) => {
      // console.log('db', err, appt);
    }).then(info => {
      info[1] = 'A appointment has been started'
      io.emit('appt-start', info)
      res.send(info)
    })
  });

  app.post('/api/end-appt', (req, res) =>{
    // console.log('endpoint hit', req.body);
    db.update_appt([req.body.a_id,'service-completed'], (err, appt) => {
      // console.log('db', err, appt);
    }).then(info => {
      info[1] = 'A appointment has been completed and needs to be cashed out'
      io.emit('appt-end', info)
      res.send(info)
    })
  });



  // Getting appts from Barber
  app.post('/api/appts', (req, res)=> {
    // console.log('-- bod cuming in --',req.body);
    db.get_appts(req.body.id, (err, appts)=>{
      console.log(err, appts);
    }).then((appts)=> {
      // console.log(' -- appts from DB -- ',appts)
      res.send(appts)
    })
  })

  app.post('/api/getproducts', (req, res)=>{
    // console.log('id to get products',req.body.id)
    db.getProducts(req.body.id, (err,data)=>{
      // console.log('db for products', err, data);
    }).then((data)=>{
      // console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })


  app.post('/api/addproduct', (req, res)=>{
    let array = [
      req.body.product,
      req.body.price,
      req.body.type,
      req.body.quantity,
      req.body.shop_id
    ]
    // console.log('id to get products',array)
    db.addProducts(array, (err,data)=>{
      // console.log('db for adding products', err, data);
    }).then((data)=>{
      // console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })

  app.post('/api/getshops', (req, res) => {
    // console.log('shops @server');
    db.get_shops((err, data) => {
    }).then((data) => {
      // console.log("shops from db", data);
      res.send(data)
    })
  })


  app.post('/api/editproduct', (req, res)=>{
    let array = [
      req.body.product,
      req.body.price,
      req.body.type,
      req.body.quantity,
      req.body.p_id,
      req.body.shop_id
    ]
    // console.log('id to get products',array)
    db.editProducts(array, (err,data)=>{
      // console.log('db for editing products', err, data);
    }).then((data)=>{
      // console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })


  app.post('/api/deleteproduct', (req, res)=>{
    // console.log('id to delete products',req.body.p_id)
    db.deleteProducts(req.body.p_id, (err,data)=>{
      // console.log('db for editing products', err, data);
    }).then((data)=>{
      // console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })


  app.post('/api/reports/products', (req, res)=>{
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    // console.log('info to get product reports',array)
    db.reports_products(array, (err,data)=>{
      // console.log('info to get product reports', err, data);
    }).then((data)=>{
      // console.log('info to get product reports',data)
      res.send(data)
    })
  })

  app.post('/api/appt/complete', (req, res)=>{
    let array = [
      req.body.a_id,
      req.body.tip,
      req.body.total,
      req.body.v_id2,
      req.body.v_id3,
      req.body.p_id,
      req.body.quantity,
      req.body.p_id2,
      req.body.quantity2,
      req.body.paymth,
      req.body.status,
      req.body.v_id4,
      req.body.v_id5
    ]
    // console.log('completeing appt',array)
    db.complete_appt(array, (err,data)=>{
      // console.log('info to get product reports', err, data);
    }).then((data)=>{
      // console.log('info to get product reports',data)
      res.send(data)
    })
  })

  app.post('/api/appt/walkinTrans', (req, res)=>{
    let array2 = [
      req.body.shop_id,
      req.body.start_time,
      req.body.v_id,
      req.body.b_id,
      req.body.v_id1,
      req.body.v_id1,
      'walk-in',
      req.body.c_id
    ]
    // console.log('walk in appt',array2)
    db.addCompeletedAppt(array2, (err,data)=>{
      // console.log('info to get product reports', err, data);
    }).then((data)=>{
      // console.log('info to get product reports',data)
      res.send(data)
    })
  })


  app.post('/api/appt/newcustomerwalkin', (req, res)=>{
    let array1 = [
      req.body.c_first,
      req.body.c_last,
      req.body.c_phone,
      req.body.c_email,
      req.body.b_day,
      req.body.c_shop
    ]
    let array2 = [
      req.body.shop_id,
      req.body.start_time,
      req.body.v_id,
      req.body.b_id,
      req.body.v_id1,
      req.body.v_id2,
      'walk-in'
    ]
    var c_id
    // console.log('completeing appt',array1)
    db.add_contact(array1, (err,data)=>{
      // console.log('info to get product reports', err, data);
    }).then((data)=>{
        array2.push(data[0].c_id)
        db.addCompeletedAppt(array2, (err,data)=>{
          // console.log('info to get product reports', err, data);
        })
    })
  })


  app.post('/api/appt/productTrans', (req, res) => {
    let array = [
      req.body.shop_id,
      req.body.start_time,
      req.body.p_id,
      req.body.quantity,
      req.body.total,
      req.body.tip,
      req.body.pay_mth
    ]
    db.productTrans(array, (err, trans) => {}).then(trans =>{
      res.send(trans)
    })
  })

  app.post('/api/add-new-shop', (req, res) => {
    db.add_new_shop([req.body.s_name, req.body.address], (err, data) => {
    }).then(data => res.send(data))
  })

  app.post('/api/appt/getInWaitList', (req, res) => {
    array = [
      req.body.id,
      'walk-in'
    ]
    db.get_walk_ins(array, (err, data) => {
    }).then(data => res.send(data))
  })

  app.post('/api/appt/waittoprogress', (req, res) => {
    array = [
      req.body.a_id,
      'service-completed'
    ]
    db.wait_to_progress(array, (err, data) => {
    }).then(data => res.send(data))
  })

  app.post('/api/appt/deletewalkin', (req, res) => {
    db.delete_walk_in(req.body.a_id, (err, data) => {
    }).then(data => res.send(data))
  })


  app.post('/api/appt/cust-history', (req, res) => {
    db.cust_history([req.body.cust_id, req.body.shop_id], (err, data) => {
    }).then(data => res.send(data))
  })

  app.post('/api/appt/appt-length', (req, res) => {
    console.log(req.body,'body is here')
    db.post_appt_length([req.body.a_id, req.body.time], (err, data) => {
    }).then(data => res.send(data))
    })

  })



  // NODE MAILER-----------------///
  // ---------------------------------

  //  +++++++ BEGINS  ++++++++++😡
  app.post('/api/sendmail', (req, res) =>{
      var timecardHEAD = `
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

      var transreportHEAD = `
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
          <th>Appt Date</th>
          <th>Barber</th>
          <th>Client</th>
          <th>Service</th>
          <th>Price</th>
          <th>Tip</th>
          <th>Pymt Method</th>
          <th>Amount Paid</th>
        </tr>`;


      var productsreportHEAD = `
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
          <th>Name</th>
          <th>Type</th>
          <th>In Stock</th>
          <th># Sold</th>
          <th>Cost Per</th>
          <th>Net Sales</th>
        </tr>`;

      var barberEarnsreportHEAD = `
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
      `;


    var getStuff = function() {

      var server = email.server.connect({user: "", password: "", host: "smtp.gmail.com", port: 465, ssl: true});
      console.log('email server connected');

      var array = [
        1,
        moment(new Date().setDate(new Date().getDate() - 12)).format('YYYY-MM-DD'),
        moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')
      ]
      var timecard
      var productsreport
      var products
      var transreport
      var barbers
      var services

      var go = ()=>{
            db.timecards(array, (err, info)=> {console.log('-- timecard added to server --',err,info);}).then(info =>{
               timecard = info
              //  console.log('timecard',timecard)
              db.shop_trans(array, (err, trans) => { }).then(trans =>{
                transreport = trans
                // console.log('CALLED !!!! transreport',transreport)
              }).then(()=> {
                db.reports_products(array, (err,data)=>{ }).then(x =>{
                  productsreport = x
                  // console.log('---  productsreport ---',productsreport)
                }).then(()=> {
                  db.getProducts(array[0], (err,data)=>{ }).then(x =>{
                    products = x
                    // console.log('products',products)
                  }).then(()=> {
                     db.get_barbers(array[0], (err,data)=>{ }).then(x =>{
                      barbers = x
                    }).then(()=> {
                      db.get_services(array[0], (err,data)=>{ }).then(x =>{
                        services = x
                      }).then(()=> {
                        maketemp(timecard,transreport,productsreport,products,barbers,services)
                    })
                  })
                })
              })
            })
          })
      }
     


      var timecardBODY
      var productsreportBODY
      var transreportBODY
      var newproducts = []
      var maketemp = function(timecard,transreport,productsreport,products,barbers,services){
        // console.log('products',products,'barbers',barbers,'services',services)

        timecardBODY = timecard.reduce(function(a, b) {
          return a + '<tr><td>' + b.first_name + ' ' + b.last_name + '</td><td>' + moment(b.time_in).format('l LT') + '</td><td>' + moment(b.time_out).format('l LT') + '</td></tr>';
        }, '');

        transreportBODY = transreport.reduce(function(a, b) {
          return a + '<tr><td>' + moment(b.start_time).format('l LT') + '</td><td>'
                   + b.b_first + ' ' + b.b_last + '</td><td>'
                   + b.c_first + ' ' + b.c_last + '</td><td>'
                   + b.service + '</td><td>'
                   + b.price + '</td><td>'
                   + b.tip + '</td><td>'
                   + b.pay_mth + '</td><td>'
                   + b.total + '</td></tr>';
        }, '');
 
        // console.log('im here',transreport)
        barbers.map(barber =>{
          barber.report = []
          services.map(r=>{
            // console.log('v_id',r.v_id)
             barber.report.push({
                'v_id': r.v_id,
                'service': r.service,
                'price': r.price,
                'count': 0,
                'shopE': 0,
                'barberE': 0,
                'tip': 0,
                'time': 0
              })
          })

          for (var x = 0; x < transreport.length; x++) {
            if(transreport[x].barber_id == barber.b_id){
              console.log('transreport[x].barber_id == barber.b_id',transreport[x].barber_id,'==',barber.b_id)
              for (var i = 0; i < barber.report.length; i++){
                if(
                  barber.report[i].v_id == transreport[x].service_id || 
                  barber.report[i].v_id == transreport[x].service_id2 || 
                  barber.report[i].v_id == transreport[x].service_id3 || 
                  barber.report[i].v_id == transreport[x].service_id4 || 
                  barber.report[i].v_id == transreport[x].service_id5
                ){
                    // console.log('in service',barber.report[i].v_id, '===', transreport[x].service_id)
                        if(barber.type == 'hourly'){
                          // console.log('in it hourly');
                          var rate = barber.rate.split('/')[0].replace('$','')
                          var time = 6;
                          barber.report[i].count = barber.report[i].count + 1
                          barber.report[i].barberE = Number(barber.report[i].barberE) + (time * Number(rate))
                          barber.report[i].shopE = Number(barber.report[i].shopE) + Number(barber.report[i].price.split('$')[1])
                          barber.report[i].tip = Number(barber.report[i].tip) + Number(transreport[x].tip.split('$')[1])
                        }
            
                        if(barber.type == 'commission'){
                          var com = Number('.' + barber.rate.split('%')[0])
                          // console.log('in it commission',com);
                          barber.report[i].count = barber.report[i].count + 1
                          barber.report[i].barberE = Number(barber.report[i].barberE) + (Number(barber.report[i].price.split('$')[1]) * Number(com))
                          barber.report[i].shopE = Number(barber.report[i].shopE) + (Number(barber.report[i].price.split('$')[1]) * (1-Number(com)))
                          barber.report[i].tip = Number(barber.report[i].tip) + Number(transreport[x].tip.split('$')[1])
                          console.log('---- earnreport -----',typeof barber.report[i].barberE)
                        }
            
                        if(barber.type == 'booth rent'){
                          // console.log('in it booth rent');
                          barber.report[i].count = barber.report[i].count + 1
                          barber.report[i].barberE = Number(barber.report[i].barberE) + Number(barber.report[i].price.split('$')[1])
                          barber.report[i].shopE = Number(barber.rate.split('$')[1].split('/')[0])
                          barber.report[i].tip = Number(barber.report[i].tip) + Number(transreport[x].tip.split('$')[1])
                        } 

                    } 
                }
              }
            }
            // console.log('---- barber -----',barber)
          })

          barberEarnsreportBODY = []
          var quick
          barbers.map(x=>{
            var pay
            if(x.type === 'hourly'){
              pay =  x.type +" - "+ x.rate
            }
            if(x.type === 'commission'){
              pay = x.type +" - "+ x.rate
            }
            if(x.type === 'booth rent'){
              pay = x.type
            }

            quick = x.report.reduce(function(a, b) {
              return a + '<tr><td>' + b.service + '</td><td>'
              + b.count + '</td><td>'
              + b.shopE.toFixed(2) + '</td><td>'
              + b.barberE.toFixed(2) + '</td><td>'
              + b.tip.toFixed(2) + '</td><td>'
              + b.time + '</td></tr>';
            }, '');
              
              quick = `
              <h3> ${x.b_first}  ${x.b_last} - ${pay} </h3>
              <table>
              <tr>
                <th>Service</th>
                <th>Count</th>
                <th>Net for Shop</th>
                <th>Net for Barber</th>
                <th>Tips</th>
                <th>Time Spent</th>
              </tr>` + quick + `</table>`
            barberEarnsreportBODY.push(quick)
            // console.log('---- barberEarnsreportBODY -----',x.report)
          })
        
        products.map(x=>{
          newproducts.push({
            'p_id': x.p_id,
            'type': x.type,
            'product': x.product,
            'quantity': x.quantity,
            'sold': 0,
            'price': x.price,
            'netsales': 0
          })
        })

        for (var i = 0; i < newproducts.length; i++) {
          for (var j = 0; j < productsreport.length; j++) {
            if(newproducts[i].p_id == productsreport[j].product_id) {
              newproducts[i].sold = newproducts[i].sold + productsreport[j].qty
              newproducts[i].netsales = newproducts[i].netsales + (productsreport[j].qty * Number(newproducts[i].price.split('$')[1]))
            }
            if(newproducts[i].p_id == productsreport[j].product_id2) {
              newproducts[i].sold = newproducts[i].sold + productsreport[j].qty2
              newproducts[i].netsales = newproducts[i].netsales + (productsreport[j].qty2 * Number(newproducts[i].price.split('$')[1]))
            }
          }
          if(newproducts.length-1 == i){
            newproducts.map(x=>{
              x.netsales = '$' + x.netsales.toFixed(2) 
            })
            name()
          }
        }

        function name() {
          // console.log('-----     reduce products      ----')
          
          productsreportBODY = newproducts.reduce(function(a, b) {
            return a + '<tr><td>' + b.product + '</td><td>'
                     + b.type + '</td><td>'
                     + b.quantity + '</td><td>'
                     + b.sold + '</td><td>'
                     + b.price + '</td><td>'
                     + b.netsales + '</td></tr>';
          }, '');
        }


        console.log('here is email Tmp', timecardBODY)
        server.send({
          text: "",
          from: "hairBy.com",
          to: 'ddecicco@buffalo.edu',
          subject: "Daily Report from hairBy!",
          attachment: [
            {
              data: `${timecardHEAD}${timecardBODY}</table></body></html>`,
              alternative: true
            }
          ]
        }, function(err, message) {
          if (err)
            console.log(err);
          else
            console.log({success: true, msg: 'sent'});
          }
        )
        server.send({
          text: "",
          from: "hairBy.com",
          to: 'ddecicco@buffalo.edu',
          subject: "Daily Report from hairBy!",
          attachment: [
            {
              data: `${transreportHEAD}${transreportBODY}</table></body></html>`,
              alternative: true
            }
          ]
        }, function(err, message) {
          if (err)
            console.log(err);
          else
            console.log({success: true, msg: 'sent'});
          }
        )
        server.send({
          text: "",
          from: "hairBy.com",
          to: 'ddecicco@buffalo.edu',
          subject: "Daily Report from hairBy!",
          attachment: [
            {
              data: `${productsreportHEAD}${productsreportBODY}</table></body></html>`,
              alternative: true
            }
          ]
        }, function(err, message) {
          if (err)
            console.log(err);
          else
            console.log({success: true, msg: 'sent'});
          }
        )
        server.send({
          text: "",
          from: "hairBy.com",
          to: 'ddecicco@buffalo.edu',
          subject: "Daily Report from hairBy!",
          attachment: [
            {
              data: `${barberEarnsreportHEAD}${barberEarnsreportBODY}</table></body></html>`,
              alternative: true
            }
          ]
        }, function(err, message) {
          if (err)
            console.log(err);
          else
            console.log({success: true, msg: 'sent'});
          }
        )
        return
      }
      go()
      // maketemp(timecard,transreport,productsreport,products)
    }
    getStuff()
  
  })
  // ++++++++++++ ends ++++++++++++++++

  var job = new CronJob({
    cronTime: '00 11 00 * * 1-5',
    onTick: function() {
      console.log('email begins to send')
      sendEmail()
    },
    start: true,
    timeZone: 'America/Denver'
    });
    job.start();
