const Reading = require('../models').Reading;
const Device = require('../models').Device;
const Phone = require('../models').Phone;

module.exports = {
  list(req, res) {
    let serverDeviceId = req.params.serverDeviceId;
    if ( serverDeviceId === null || serverDeviceId === undefined ) {
      returnError('Incorrect format');
      return;
    }
    
    Device.findOne({
      attributes: ['id'],
      where: {
        serverDeviceId: serverDeviceId
      }
    }).then( (device) => {
      if ( device !== null ) {
        Reading
          .findAll({
            attributes: ['deviceTime', 'pm25', 'microclimate'],
            where: {
              deviceId: device.id
            },
            order: '"deviceTime" DESC'
          })
          .then(readings => res.status(200).send(readings))
          .catch(error => res.status(400).send(error));
      }
    })
  },
  
  add(req, res) {
    let serverDeviceId = req.params.serverDeviceId;
    if ( serverDeviceId === null || serverDeviceId === undefined ) {
      returnError('Incorrect format');
      return;
    }
    
    // TODO:
    // 1. verify phoneUuid consistency
    // 2. verify phoneUuid exists in Phones table
    // 3. get all devices belonging to Phone
    // 3b. verify all deviceIds exist in list, and match their sensorUuid
    // 4. map findOrCreate(newReading) to an array
    // 5. do .all().then(): return send{success:arrLength, failure:0}
    // 6. do .catch(): return send{success:numReadings-arrLength, failure: arrLength}
    // TODO: test if req.body works

    let readings = req.body;
    if ( Object.prototype.toString.call( readings ) !== '[object Array]' ) {
      returnError('Incorrect format');
    }
    
    const returnObject = {
      pass: 0,
      fail: 0
    }
    
    // Variables used for knowing when the events are complete
    let promiseCompletion = 0;
    let promiseFire = 0;
    
    Device.findOne({
      attributes: ['id'],
      where: {
        serverDeviceId: serverDeviceId
      }
    }).then( (device) => {
      if ( device !== null ) {
        console.log( "Found device for ", serverDeviceId, device );
        readings.forEach((reading) => {
          reading.deviceId = device.id;
          verifyData(reading);
          promiseFire++;
          Reading.create(reading).then( (response) => {
            returnObject.pass++;
            promiseCompletion++;
            promiseDone();
          }).catch( (error) => {
            console.log(error);
            returnObject.fail++;
            promiseCompletion++;
            promiseDone();
          });
        });
      } else {
        console.log( "No device for", id);
        returnObject.fail += readings.length;
        promiseDone();
      }


    });

    
    function promiseDone() {
      if ( promiseCompletion >= promiseFire) {
        res.status(201).send(returnObject);
      }
    }
    
    function verifyData(reading) {
      let pass = true;
      if ( reading.deviceTime === undefined || reading.deviceTime === null ) {
        reading.deviceTime = Date.now();
        pass = false;
      }
      if ( reading.pm25 === undefined || reading.pm25 === null ) {
        reading.pm25 = 2.6;
        pass = false;
      }
      if ( reading.microclimate === undefined || reading.microclimate === null ) {
        reading.microclimate = 1;
        pass = false;
      }
      if ( reading.locationLat === undefined || reading.locationLat === null ) {
        reading.locationLat = 1.3;
        pass = false;
      }
      if ( reading.locationLon === undefined || reading.locationLon === null ) {
        reading.locationLon = 103;
        pass = false;
      }
      if ( reading.locationAcc === undefined || reading.locationAcc === null ) {
        reading.locationAcc = 10;
        pass = false;
      }
      if ( reading.locationEle === undefined || reading.locationEle === null ) {
        reading.locationEle = 5;
        pass = false;
      }
      return pass;
    }
    
    function returnError(error, status) {
      if ( status === null || status === undefined ) {
        status = 400;
      }
      res.status(status).send('{ "error":"'+error+'" }');
    }

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
    // Locate device with ID
    let serverDeviceId = req.params.serverDeviceId;
    console.log(req.params);
    if ( serverDeviceId === null || serverDeviceId === undefined ) {
      returnError('Incorrect format');
      return;
    }
  
    Device.findOne({
      attributes: ['id'],
      where: {
        serverDeviceId: serverDeviceId
      }
    }).then((device) => {
      if ( device === null ) {
        returnError('Invalid device');
        return;
      }
      console.log("Found device with id ", device.id);
      getLatestReading(device.id);
    }).catch((error) => {
      returnError(error);
    });
    
    
    function getLatestReading(deviceId) {
      Reading.findOne({
        attributes: ['deviceTime', 'pm25', 'microclimate'],
        where: {
          deviceId: deviceId
        },
        order: '"deviceTime" DESC'
      }).then((reading) => {
        returnReading(reading);
      }).catch((error) => {
        returnReading();
      })
    }
    
    function returnReading(reading) {
      const returnObject = {
        exist: false,
        reading: {}
      };
      if ( reading !== null && reading !== undefined ) {
        returnObject.exist = true;
        returnObject.reading = reading;
      }

      res.status(200).send(returnObject);        
    }
    
    function returnError(error, status) {
      if ( status === null || status === undefined ) {
        status = 400;
      }
      res.status(status).send('{ "error":"'+error+'" }');
    }
  },
  
  
};
