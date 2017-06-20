const Reading = require('../models').Reading;
const Device = require('../models').Device;
const Phone = require('../models').Phone;

module.exports = {
  add(req, res) {
    // TODO:
    // 1. verify phoneUuid consistency
    // 2. verify phoneUuid exists in Phones table
    // 3. get all devices belonging to Phone
    // 3b. verify all deviceIds exist in list, and match their sensorUuid
    // 4. map findOrCreate(newReading) to an array
    // 5. do .all().then(): return send{success:arrLength, failure:0}
    // 6. do .catch(): return send{success:numReadings-arrLength, failure: arrLength}
    // TODO: test if req.body works

    req.body.forEach(function(newReading) {
      var phonePromise = Phone.findOne({
        where: {phoneUuid: newReading.phoneUuid}
      });
      var devicePromise = Device.findOne({
        where: {
          id: newReading.deviceId,
          sensorUuid: newReading.sensorUuid
        }
      });

      var promises = [phonePromise, devicePromise];
      Promise.all(promises).then(function(results) {
        if (!results[0] || !results[1]) {
          return res.status(404).send({
            message: 'Invalid phone or device details',
          });
        }
        Reading.findOrCreate({ // where and defaults?
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
      }).catch(error => res.status(400).send(error));
    });
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
