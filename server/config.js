const config = {

  db: {
    production: process.env.MONGODB_URI, // on heroku
    development: 'mongodb://localhost/clientdirectory', // locally
    test: 'mongodb://localhost/clientdirectory-test', //test mode
  },

};

module.exports = config;
