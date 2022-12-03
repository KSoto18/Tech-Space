const router = require('express').Router();
const { Blog, User } = require('../models/');
const withAuth = require('../utils/auth');

// Renders Blogs into the Dashboard

router.get('/', withAuth, async (req, res) => {

    try {
        const blogData = await Blog.findAll({
            where: { "userId": req.session.userId },
            include: [User]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('dashboard', { blogs });

    } catch (err) {
        console.log(err);
        res.redirect('login');
    }
});


module.exports = router;