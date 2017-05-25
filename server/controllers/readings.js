const Reading = require('../models').Reading;

module.exports = {
  add(req, res) {
    // TODO:
    // 1. verify of phoneUuid exists in Phones table
    // 2. verify if sensorUuid matches deviceId in Devices table
    // - if any of the above fail, return error
    // 3. For each item in the req.body, do findOrCreate (inc. time)
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
    // TODO: At some point, probably want some filters
    return Reading
      .all()
      .then(readings => res.status(200).send(readings))
      .catch(error => res.status(400).send(error));
  },
  latest(req, res) {
    // TODO:
    // 1. Check if phoneUuid exists in phone table
    // 2. Try to get deviceId using sensorUuid
    // 2b. catch: return error
    // 3. Try to get the latest reading using findAll() on deviceId
    // 3b. then: return reading
    // 3c. catch: return null
    // gotta get a merge of Reading and Device (inefficient?)
    // And do a findAll() on sensorUuid
    // http://stackoverflow.com/questions/35445849/sequelize-findone-latest-entry
    return Reading
      .all()
      .then(readings => res.status(200).send(readings))
      .catch(error => res.status(400).send(error));
  },
};
