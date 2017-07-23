const express = require('express');
const router = express.Router();

const readingsController = require('../controllers').readings;
const devicesController = require('../controllers').devices;
const phonesController = require('../controllers').phones;


router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Airers API!',
}));

// Routes for the app
router.post('/v1/devices/register', devicesController.register);
// router.get('/api/v1/devices/:serverDeviceId/readings', readingsController.list);
router.post('/v1/devices/:serverDeviceId/readings', readingsController.add);
router.get('/v1/devices/:serverDeviceId/readings/latest', readingsController.latest);

// Routes for the frontend
router.get('/v1/phones', phonesController.list);
router.get('/v1/devices', devicesController.list);
router.get('/v1/devices/:serverDeviceId/readings', readingsController.list);
router.get('/v1/devices/:serverDeviceId/phones', phonesController.readingPhones);


router.get('/*', (req, res) => res.status(400).send({
  message: 'Invalid route',
}));


module.exports = router;
