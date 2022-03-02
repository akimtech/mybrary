/*
if (process.env.NODE_ENV !== 'production'){
  //  require('dotenv').parse()
  require('dotenv').parse()
}
*/
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const expresslayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
/*
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kwame:kwame123@nodeexpressproject.mpx79.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);

console.log(`Connecting to the server on port 3000`)