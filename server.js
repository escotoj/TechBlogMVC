const express = require('express');
const exphb = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helper = require('./utils');

const hbs = exphb.create({
    helpers
});

const sequelize = require('.config/connection');

const app = express();
const PORT = process.env.PORT || 3001;



sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
    })
});
