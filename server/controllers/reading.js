const Todo = require('../models').Reading;

module.exports = {
  create(req, res) {
    return Reading
      .create({
        deviceTime: req.body.deviceTime,
        pm25: req.body.pm25,
        microclimate: req.body.microclimate,
        locationLat: req.body.locationLat,
        locationLon: req.body.locationLon,
        locationAcc: req.body.locationAcc,
        locationEle: req.body.locationEle
      })
      .then(reading => res.status(201).send(reading))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Reading
      .all()
      .then(readings => res.status(200).send(readings))
      .catch(error => res.status(400).send(error));
  },
};
