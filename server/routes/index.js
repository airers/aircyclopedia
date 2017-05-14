const appController = require('../controllers').readings;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.get('/api/readings', appController.list);
  app.post('/api/readings', appController.create);
};
