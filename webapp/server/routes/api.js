const express = require('express');
const router = express.Router();

const readingsController = require('../controllers').readings;
const devicesController = require('../controllers').devices;


router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Airers API!',
}));


router.post('/v1/devices/register', devicesController.register);
// router.get('/api/v1/devices/:serverDeviceId/readings', readingsController.list);
router.post('/v1/devices/:serverDeviceId/readings', readingsController.add);
router.get('/v1/devices/:serverDeviceId/readings/latest', readingsController.latest);

router.get('/*', (req, res) => res.status(400).send({
  message: 'Invalid route',
}));


module.exports = router;
