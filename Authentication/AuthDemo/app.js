var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user');

mongoose
	.connect(
		'mongodb+srv://bes:bes@cluster0-87uf4.mongodb.net/auth_demo_app?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useCreateIndex: true
		}
	)
	.then(() => {
		console.log('connected to db');
	})
	.catch(err => {
		console.log(`Error ${err}`);
	});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	require('express-session')({
		//session'i encode-decode etmek icin kullanilan key
		secret: 'herkesin hayatina kimse karisamaz',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES
app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret', isLoggedIn ,(req, res) => {
	res.render('secret');
});

//AUTH ROUTES

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	// req.body.username
	// req.body.password
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, () => {
			res.redirect('/secret');
		});
	});
});

app.get('/login', (req, res) => {
	res.render('login');
});

//login logic
//middleware
app.post('/login',
	passport.authenticate('local', {
		successRedirect: '/secret',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

app.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
});

//middleware func.
//next => next thing that needs to be called 
//next => route'taki func(req,res) fonksiyonu veya bir sonraki middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, () => {
	console.log('server is on');
});