const Reading = require('../models').Reading;
const Device = require('../models').Device;
const Phone = require('../models').Phone;

module.exports = {
  list(req, res) {
    // TODO: At some point, probably want some filters
    return Reading
      .all()
      .then(readings => res.status(200).send(readings))
      .catch(error => res.status(400).send(error));
  },
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

    var readings = req.body;
    if ( Object.prototype.toString.call( readings ) !== '[object Array]' ) {
      returnError('{ "error":"Incorrect format" }');
    }
    
    var readingsHash = {};
    
    // Sort them into their individual hashes
    readings.forEach( function(reading) {
      if ( readingsHash.hasOwnProperty(reading.serverDeviceId) ) {
        readingsHash[reading.serverDeviceId].push(reading);
      } else {
        readingsHash[reading.serverDeviceId] = [reading];
      }
    });
    
    let deviceCount = 0;
    
    console.log(readingsHash);
    
    const returnObject = {
      pass: 0,
      fail: 0
    }
    
    let promiseCompletion = 0;
    let promiseFire = 0;
    let devicePromises = 0;
    
    for (let id in readingsHash) {
      if (readingsHash.hasOwnProperty(id)) {
        deviceCount++;
        const readingArray = readingsHash[id];
        Device.findOne({
          attributes: ['id'],
          where: {
            serverDeviceId: id
          }
        }).then( (device) => {
          if ( device !== null ) {
            console.log( "Found device for ", id, device );
            readingArray.forEach((reading) => {
              reading.deviceId = device.id;
              verifyData(reading);
              promiseFire++;
              Reading.create(reading).then( (response) => {
                returnObject.pass++;
                promiseCompletion++;
                console.log("Promise success");
                promiseDone();
              }).catch( (error) => {
                console.log(error);
                returnObject.fail++;
                promiseCompletion++;
                console.log("Promise error");
                promiseDone();
              });
            });
          } else {
            console.log( "No device for", id);
            returnObject.fail += readingArray.length;
          }
          devicePromises++;
          promiseDone();
        });
      }
    }
    
    function promiseDone() {
      if ( devicePromises >= deviceCount &&
           promiseCompletion >= promiseFire) {
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
    // return;
    // 
    // req.body.forEach(function(newReading) {
    //   var phonePromise = Phone.findOne({
    //     where: {phoneUuid: newReading.phoneUuid}
    //   });
    //   var devicePromise = Device.findOne({
    //     where: {
    //       id: newReading.deviceId,
    //       sensorUuid: newReading.sensorUuid
    //     }
    //   });
    // 
    //   var promises = [phonePromise, devicePromise];
    //   Promise.all(promises).then(function(results) {
    //     if (!results[0] || !results[1]) {
    //       return res.status(404).send({
    //         message: 'Invalid phone or device details',
    //       });
    //     }
    //     Reading.findOrCreate({ // where and defaults?
    //       deviceTime: req.body.deviceTime,
    //       pm25: req.body.pm25,
    //       microclimate: req.body.microclimate,
    //       locationLat: req.body.locationLat,
    //       locationLon: req.body.locationLon,
    //       locationAcc: req.body.locationAcc,
    //       locationEle: req.body.locationEle
    //     })
    //     .then(reading => res.status(201).send(reading))
    //     .catch(error => res.status(400).send(error));
    //   }).catch(error => res.status(400).send(error));
    // });
    
    function returnError(error) {
      res.status(400).send(error);
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
    return Reading
      .all()
      .then(readings => res.status(200).send(readings))
      .catch(error => res.status(400).send(error));
  },
};
