const router = require('express').Router();
const { User, Blog, Comment } = require('../models');


// Shows all Blogs

router.get('/', async (req, res) => {

    if (!req.session.loggedIn) {
        res.redirect('/login');

    } else {
        try {
            const blogInfo = await Blog.findAll(
                {
                    include: {
                        model: User, attributes: { exclude: ["password"] }
                    }
                }
            );

            const blogs = blogInfo.map((blog) =>
                blog.get({ plain: true })
            );

            res.render('homepage', { blogs });

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        };
    }
});

// Gets to the login section

router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');

});

module.exports = router;