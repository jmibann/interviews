const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/db');
const sessionStore = new SequelizeStore({ db });
const Index = require('./routes/index');
const User = require('./models/User');
const condition = { where: { nombre: 'admin' } };
const admin = { nombre: 'admin', email: 'admin@endava.com', password: '123456', area: 'admin', isAdmin: true }
const sysAdmin = { nombre: 'user', email: 'user@endava.com', password: '123456', area: 'user', isAdmin: true }


app.use(cookieParser());

app.use(session({ secret: 'passport', store: sessionStore, resave: false, saveUninitialized: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(user => done(null, user));
});

const strategy = { usernameField: 'email', passwordField: 'password' }

passport.use(new LocalStrategy(strategy, function (username, password, done) {
  User.findOne({ where: { email: username } }).then(function (user) {
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  }).catch(done);
}
));

app.use(express.static(path.resolve(__dirname, '../front/')));

app.use('/api', Index);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});


sessionStore.sync().then(() => db.sync({ force: false }).then(con => {
  User.findOne(condition).then(user => {
    if (!user) {
      User.create(admin);
      User.create(sysAdmin);
    }
  });
  console.log(`${con.options.dialect} database ${con.config.database} connected at ${con.config.host}:${con.config.port}`);
  app.listen(3000, () => console.log('SERVER LISTENING AT PORT', 3000));
}));


