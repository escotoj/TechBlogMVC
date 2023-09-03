const sequelize = require ('../config/connection');
const seedBlog = require('./blogSeed');
const seedUsers = require('./userSeed');
const seedComments = require('./commentSeed');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedBlog();

    await seedComments();

    process.exit(0);
};

seedDatabase();





