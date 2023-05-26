const { User } = require('../models');

const userData = [
    {
        id: "1",
        username: "test",
        password: "123"
    },
    {
        id: "2",
        username: "joz",
        password: "123"
    },
    {
        id: "3",
        username: "zay",
        password: "123"
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;

