const express = require('express');
// connects express to handlebars
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');

const SequelizeStore = require('connect-session-sequelize')(session.Store);


// importing handlebars to add a helper for (===) 
Handlebars = require('handlebars');

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

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



// template enginee - config of how handle bars should be setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes)



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    })
});
