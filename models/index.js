const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');


// Blogs relation to User

Blog.belongsTo( User, {
    foreingkey: 'userId'
});

User.hasMany( Blog, {
    foreingkey: 'userId'
});


// Comments relation to User

Comment.belongsTo( User, {
    foreignKey: 'userId'
});

User.hasMany( Comment, {
    foreignKey: 'userId'
});


// Comments relation to Blogs

Comment.belongsTo( Blog, {
    foreignKey: 'blogId'
});

Blog.hasMany( Comment, {
    foreignKey: 'blogId'
});


module.exports = { Blog, User, Comment };