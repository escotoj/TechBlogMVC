const Blog = require('./Blog');
const User = require('./User');


//  must include the hasmany or belongs to for the dashboard display for blogs, so blogs belongs to user somehow.

module.exports = {
  Blog,
  User,
};