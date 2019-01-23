const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
	//set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}


const port = process.env.PORT || 5000;

app.listen(port , console.log(`server radi na portu ${port}`));