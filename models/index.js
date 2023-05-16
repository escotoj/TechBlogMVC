const Blog = require('./Blog');
const User = require('./User');


//  must include the hasmany or belongs to for the dashboard display for blogs, so blogs belongs to user somehow.

// Blog belongsTo User

// User hasMany Blogs

// Blog hasMany COmmnets

// Commner belongsto Blog

module.exports = {
  Blog,
  User,
};