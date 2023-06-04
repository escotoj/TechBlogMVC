const { Comment } = require('../models');

const commentData = [
    {
        id: "1",
        text: "Rocky vs Ali!",
        blog_id: "987",
        blogger_id: "2"
    },
    {
        id: "2",
        text: "Wher you been?",
        blog_id: "987",
        poster_id: "3"
    },
    {
        id: "3",
        text: "Where yyou from ",
        blog_id: "602",
        blogger_id: "2"
    },
    {
        id: "4",
        text: "donde vas vato!",
        blog_id: "948",
        blogger_id: "2"
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;