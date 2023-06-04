const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');


User.hasMany(Blog, {
  foreignKey: 'creator_id',
});

User.hasMany(Comment, {
  foreignKey: 'blogger_id',
});

Blog.belongsTo(User, {
  foreignKey: 'creator_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(User, {
  foreignKey: 'blogger_id'
});





module.exports = {
  Blog,
  User,
  Comment
};
