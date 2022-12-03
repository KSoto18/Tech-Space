const router = require('express').Router();
const { User } = require('../../models');

// Create a new User 

router.post('/', async (req, res) => {

  try {
    const newUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUserData.id;
      req.session.username = newUserData.username;
      req.session.loggedIn = true;

      res.json(newUserData);

    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login Route

router.post('/login', async (req, res) => {

  try {
    const userInfo = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userInfo) {
      res.status(400).json({ message: 'No user was found, try again!' });
      return;
    }

    const validatePassword = userInfo.checkPassword(req.body.password);

    if (!validatePassword) {
      res.status(400).json({ message: 'Password does not match the user, try again!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userInfo.id;
      req.session.username = userInfo.username;
      req.session.loggedIn = true;

      res.json({ userInfo, message: 'You are in!' });

    });

  } catch (err) {
    console.log(err);
    res.status(500).json()
  }

});

// Logout Route

router.post('/logout', (req, res) => {
  console.log(req.session.logged_in)

if (req.session.logged_in) {
  req.session.destroy(() => {
    res.status(204).end();
  });

} else {
  res.status(404).end();
}

});

module.exports = router;