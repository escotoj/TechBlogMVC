const sequelize = require('../config/connection.js');

const { User } = require('../models');

const seedDb = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate([
        {
            username: 'test',
            password: '123'
        },
        {
            username: 'test2',
            password: '123'
        }
    ]);
    process.exit(0);
}
seedDb();