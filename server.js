const express = require('express');
// connects express to handlebars
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
// const helper = require('./utils');

//configuaration setting
const hbs = exphbs.create({

});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// template enginee - config of how handle bars should be setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')
// MiddleWare - Express
// app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes)



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    })
});
