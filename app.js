const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookingRestra', {useNewUrlParser: true, useUnifiedTopology: true})
const app = express();
const port = 80;

// DEFINING MONGOOSE SCHEMA
var bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    bType: String,
    guest: String,
    date: String,
    desc: String
});

// DATABASE MODEL
var Booking = mongoose.model('Booking', bookingSchema);

// EXPRESS SPECIFIC STUFFS
//serving the static files
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFFS
//Set the template engine as pug
app.set('view engine','pug');
//Set the views directory
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req,res) => {
    const param = {};
    res.status(200).render('home.pug',param);
});
app.get('/about', (req,res) => {
    const param = {};
    res.status(200).render('about.pug',param);
});
app.get('/services', (req,res) => {
    const param = {};
    res.status(200).render('services.pug',param);
});
app.get('/bookings', (req,res) => {
    const param = {};
    res.status(200).render('booking.pug',param);
});
app.post('/bookings', (req,res)=>{
    var myData = new Booking(req.body);
    myData.save().then(() =>{
        res.render('booking.pug');
    }).catch(() => {
        res.status(400).send('Queries cannot send. Please try again!');
    })
})


// START THE SERVER
app.listen(port, () => {
    console.log(`App started successfully at ${port}`);
})