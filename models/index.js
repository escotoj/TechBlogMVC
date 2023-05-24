const Blog = require('./Blog');
const User = require('./User');
// const Comments = require('./Comment');


User.hasMany(Blog, {
  foreignKey: 'user_id'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

// User.hasMany(Comments, {
//   foreignKey: 'user_id'
// });

// Comments.belongsTo(User, {
//   foreignKey: 'user_id'
// });


module.exports = {
  Blog,
  User,
};

// module.exports = { User, Blog, Comment };