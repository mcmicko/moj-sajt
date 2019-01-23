const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').MongoURI;
//connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useMongoClient: true, })
	.then(() => console.log('mongo je konektovan...'))
	.catch(err => console.log(err))

//PASSPORT
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5001;

app.listen(PORT , console.log(`server radi na portu ${PORT}`));