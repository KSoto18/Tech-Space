const router = require('express').Router();
const { Blog } = require('../../models/');
const withAuth = require('../../utils/auth');

// Create a new Blog

router.post('/', withAuth, async (req, res) => {

    const content = req.body;
    console.log(content);

    try {
        const newBlog = await Blog.create({
            ...body,
            userId: req.session.userId
        });

        res.json(newBlog);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update a Blog by its ID

router.put('/:id', withAuth, async (req, res) => {

    try {
        console.log("Content: " + req.body);

        const [blogRows] = await Blog.update(
            req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (blogRows > 0) {
            res.status(200).json();

        } else {
            res.status(404).json({ message: 'Something went wrong!' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a Blog by its ID

router.delete('/:id', withAuth, async (req, res) => {

    try {
        const [blogRows] = Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (blogRows > 0) {
            res.status(200).json;

        } else {
            res.status(404).json({ message: 'Something went wrong!' });;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;