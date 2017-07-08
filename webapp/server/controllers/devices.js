const Device = require('../models').Device;
const Phone = require('../models').Phone;
const uuidv4 = require('uuid/v4');

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
    function getPhone(phoneUuid, phoneInfo, sensorUuid) {
      Phone.findOrCreate({
        where: {
          phoneUuid: phoneUuid,
        },
        defaults: {
          phoneInfo: JSON.stringify(phoneInfo),
          lastSeen: Date.now(),
        }
      })
      .spread((phone, created) => {
        // TODO: update lastSeen
        console.log("Created", created);
        if ( !created ) { // Update last seen
          phone.update({
            lastSeen: Date.now()
          }).then(() => {});
        }
        getDevice(phone, sensorUuid)
      })
      .catch(error => returnError(error));
    }

    function getDevice(phone, sensorUuid) {
      Device.findOrCreate({
        where: {
          sensorUuid: sensorUuid,
        },
        defaults: {
          serverDeviceId: uuidv4(),
          lastSeen: Date.now(),
          lastReading: null,
        }
      })
      .spread((device, created) => {
        if (created) {
          device.addPhone(phone)
        }
        if (!created) {
          device.update({
            lastSeen: Date.now()
          }).then(() => {})
        }
        returnData({
          id: device.serverDeviceId,
          lastReading: device.lastReading
        })
      })
      .catch(error => returnError(error));
    }
    
    
    function returnData(data) {
      res.status(201).send(data)
    }
    function returnError(error) {
      res.status(400).send(error);
    }
    
    getPhone(req.body.phoneUuid, req.body.phoneInfo, req.body.sensorUuid);
    
    
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
