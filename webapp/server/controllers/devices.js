const Device = require('../models').Device;
const Phone = require('../models').Phone;

module.exports = {
  register(req, res) {
    // 1. findOrCreate Phone with phoneUuid and phoneInfo
    // 2. Update Phone lastSeen to now
    // 3. findOrCreate Device with sensorUuid
    // 4. if device does not have phoneId, Device.addPhone(phone)
    // 5. Update Device lastSeen
    // 6. Return deviceId
    // TODO: DeviceUuid (IDs in general) has to be a UUID instead of an int.
    // TODO: convert to async/await
    console.log(req.body);
    return Phone
      .findOrCreate({
        where: {
          phoneUuid: req.body.phoneUuid,
        },
        defaults: {
          phoneInfo: req.body.phoneInfo,
          lastSeen: Date.now(),
        }
      })
      .spread((phone, created) => {
        // TODO: update lastSeen
        return Device
        .findOrCreate({
          where: {
            sensorUuid: req.body.sensorUuid,
          },
          defaults: {
            lastSeen: Date.now(),
            lastReading: null,
          }
        })
        .spread((device, created) => {
          res.status(201).send(device);
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    // Device
    //   .findOrCreate({
    //     where: {
    //       sensorUuid: req.body.sensorUuid;
    //     },
    //     defaults: {
    //       lastSeen: Date.now();
    //       lastReading: null;
    //     }
    //   })
    //   .spread((device, created) => {
    //     // TODO: Update Phone also
    //     res.status(201).send(device)}
    //   )
    //   .catch(error => res.status(400).send(error));
  }
};
