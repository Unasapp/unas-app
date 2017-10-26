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
    console.log('--- saving  timecards ---', array)
    db.timecardsSave(array, (err, cards) => {}).then(cards => {
      console.log('--- saving  timecards complete ---')
      res.send(cards)
    })
  })

  app.post('/api/post-timecards', (req, res)=> {
    console.log('here is the timecards', req.body);

    let newTimecard = [
      req.body.barberId,
      req.body.timeIn,
      req.body.timeOut,
      req.body.shopId
    ]

    db.post_timecards(newTimecard, (err, info)=> {
      console.log('-- timecard added to server --',err,info);
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
    console.log('earnings in',array)
    db.trans_earnings(array, (err, trans) => {}).then(trans => {
      console.log('--- earnings back 😡  ----',trans)
      res.send(trans)
    })
  })

  app.post('/api/delete-trans', (req, res) =>{
    console.log('-- deleting appt --',[req.body.id,"deleted"])
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
    console.log('--- Edit Trans CALLED ---- >>>',array)
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
    console.log('-- new barber created --', newUser)
    db.add_barber(newUser, (err, users) => {
      console.log('back from db -->>',err,users)})
      .then((users) => {
        console.log('-- barber from DB --',users)
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
    console.log('---delete request made---', array)
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
    console.log('endpoint hit', req.body);
    db.update_appt([req.body.a_id,'in-progress'], (err, appt) => {
      console.log('db', err, appt);
    }).then(info => {
      info[1] = 'A appointment has been started'
      io.emit('appt-start', info)
      res.send(info)
    })
  });

  app.post('/api/end-appt', (req, res) =>{
    console.log('endpoint hit', req.body);
    db.update_appt([req.body.a_id,'service-completed'], (err, appt) => {
      console.log('db', err, appt);
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
    console.log('id to get products',req.body.id)
    db.getProducts(req.body.id, (err,data)=>{
      console.log('db for products', err, data);
    }).then((data)=>{
      console.log(' -- appts from DB -- ',data)
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
    console.log('id to get products',array)
    db.addProducts(array, (err,data)=>{
      console.log('db for adding products', err, data);
    }).then((data)=>{
      console.log(' -- appts from DB -- ',data)
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
    console.log('id to get products',array)
    db.editProducts(array, (err,data)=>{
      console.log('db for editing products', err, data);
    }).then((data)=>{
      console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })


  app.post('/api/deleteproduct', (req, res)=>{
    console.log('id to delete products',req.body.p_id)
    db.deleteProducts(req.body.p_id, (err,data)=>{
      console.log('db for editing products', err, data);
    }).then((data)=>{
      console.log(' -- appts from DB -- ',data)
      res.send(data)
    })
  })


  app.post('/api/reports/products', (req, res)=>{
    let array = [
      req.body.shop_id,
      req.body.date1,
      req.body.date2
    ]
    console.log('info to get product reports',array)
    db.reports_products(array, (err,data)=>{
      console.log('info to get product reports', err, data);
    }).then((data)=>{
      console.log('info to get product reports',data)
      res.send(data)
    })
  })


  app.post('/api/appt/complete', (req, res)=>{
    let array = [
      req.body.a_id,
      req.body.tip,
      req.body.total,
      req.body.p_id,
      req.body.quantity,
      req.body.paymth,
      req.body.status
    ]
    console.log('completeing appt',array)
    db.complete_appt(array, (err,data)=>{
      console.log('info to get product reports', err, data);
    }).then((data)=>{
      console.log('info to get product reports',data)
      res.send(data)
    })
  })

  app.post('/api/appt/walkinTrans', (req, res)=>{
    let array2 = [ 
      req.body.shop_id,
      req.body.start_time,
      req.body.v_id,
      req.body.b_id,
      req.body.quantity,
      req.body.total,
      req.body.tip,
      req.body.pay_mth,
      'completed',
      req.body.p_id,
      req.body.c_id
    ]
    console.log('walk in appt',array2)
    db.addCompeletedAppt(array2, (err,data)=>{
      console.log('info to get product reports', err, data);
    }).then((data)=>{
      console.log('info to get product reports',data)
      res.send(data)
    })
  })


  app.post('/api/appt/newcustomercomplete', (req, res)=>{
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
      req.body.quantity,
      req.body.total,
      req.body.tip,
      req.body.pay_mth,
      'completed',
      req.body.p_id
    ]
    var c_id 
    console.log('completeing appt',array1)
    db.add_contact(array1, (err,data)=>{
      console.log('info to get product reports', err, data);
    }).then((data)=>{
        array2.push(data[0].c_id)
        db.addCompeletedAppt(array2, (err,data)=>{
          console.log('info to get product reports', err, data);
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



  // NODE MAILER-----------------///
  // ---------------------------------

  //  +++++++ BEGINS  ++++++++++😡
  sendEmail = ()=>{
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
        

    var getStuff = function() {

      var server = email.server.connect({user: "ac12491@gmail.com", password: "W0rkhard!", host: "smtp.gmail.com", port: 465, ssl: true});
      console.log('email server connected');

      var array = [
        1,
        moment(new Date().setDate(new Date().getDate() - 7)).format('YYYY-MM-DD'),
        moment(new Date()).format('YYYY-MM-DD')
      ]
      var timecard
      var productsreport
      var products
      var transreport

      (()=>{
            db.timecards(array, (err, info)=> {
            console.log('-- timecard added to server --',err,info);
          }).then(info =>{
             timecard = info
             console.log('timecard',timecard)
            }).then(()=>{
              db.shop_trans(array, (err, trans) => { }).then(trans =>{
                transreport = trans
                console.log('transreport',transreport)
              })
            }).then(()=>{
              db.reports_products(array, (err,data)=>{ }).then(x =>{
                productsreport = x
                console.log('---  productsreport ---',productsreport)
              })
            }).then(()=>{
              db.getProducts(array[0], (err,data)=>{ }).then(x =>{
                products = x
                console.log('products',products)
                maketemp(timecard,transreport,productsreport,products)
              })
            })
      })()


      var timecardBODY
      var productsreportBODY
      var transreportBODY
      var newproducts = []
      var maketemp = function(timecard,transreport,productsreport,products){
        console.log('maketemp,maketemp')

        timecardBODY = timecard.reduce(function(a, b) {
          return a + '<tr><td>' + b.b_first + ' ' + b.b_last + '</td><td>' + moment(b.time_in).format('l LT') + '</td><td>' + moment(b.time_out).format('l LT') + '</td></tr>';
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
            if(newproducts[i].p_id == productsreport[j].p_id) {
              newproducts[i].sold = newproducts[i].sold + productsreport[j].qty
              newproducts[i].netsales = newproducts[i].netsales + (productsreport[j].qty * Number(productsreport[j].price.split('$')[1]))
            }
          }
        }

        productsreportBODY = newproducts.reduce(function(a, b) {
          return a + '<tr><td>' + b.product + '</td><td>'
                   + b.type + '</td><td>'
                   + b.quantity + '</td><td>'
                   + b.sold + '</td><td>'
                   + b.price + '</td><td>'
                   + b.netsales + '</td></tr>';
        }, '');


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
        return
      }

    }
    getStuff()
  }
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
