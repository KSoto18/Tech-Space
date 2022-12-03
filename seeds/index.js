const sequelize = require('../config/connection');
const blogData = require('./blogseeds.json');
const userData = require('./userseeds.json');

const { User, Blog } = require('../models');

const database = async () => {
  await sequelize.sync({ force: true });
  console.log('\n---------Users Seeded---------\n')
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n---------Blogs Seeded---------\n')
  await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

database();