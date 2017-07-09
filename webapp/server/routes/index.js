const readingsController = require('../controllers').readings;
const devicesController = require('../controllers').devices;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Airers API!',
  }));


  app.post('/api/v1/devices/register', devicesController.register);
  // app.get('/api/v1/devices/:serverDeviceId/readings', readingsController.list);
  app.post('/api/v1/devices/:serverDeviceId/readings', readingsController.add);
  app.get('/api/v1/devices/:serverDeviceId/readings/latest', readingsController.latest);



};
