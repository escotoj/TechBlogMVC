const express = require('express');
// connects express to handlebars
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');

// FAVICON =================================
// var favicon = require('serve-favicon');
// var path = require('path')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//configuaration setting
const hbs = exphbs.create({
    helpers
});

const sequelize = require('./config/connection');

const app = express();


const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

// app.use(express.favicon('public/images/favicon7.ico'));
// app.use(favicon('public/images/favicon7.ico'));
// app.use('/favicon7.ico', express.favicon('public/images/favicon7.ico'));
// app.use(favicon(path.join(__dirname, 'public', 'images/favicon7.ico')))


// template enginee - config of how handle bars should be setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')
// MiddleWare - Express
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes)



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    })
});
