const { Blog } = require('../models');

const blogData = [
    {
        id: "987",
        title: "Post 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        creator_id: "1"
    },
    {
        id: "602",
        title: "Post 2",
        content: "Consequat mauris nunc congue nisi. Pellentesque pulvinar pellentesque habitant morbi.",
        creator_id: "2"
    },
    {
        id: "546",
        title: "Post 3",
        content: "Velit euismod in pellentesque massa placerat duis ultricies. ",
        creator_id: "3"
    },
    {
        id: "948",
        title: "Post 4",
        content: "Euismod elementum nisi quis eleifend quam.",
        creator_id: "2"
    }
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;