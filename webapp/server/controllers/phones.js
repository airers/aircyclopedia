const PhoneDevice = require('../models').PhoneDevice;
const Phone = require('../models').Phone;
const Device = require('../models').Device;

module.exports = {
  list(req, res) {
    Phone.findAll({
        attributes: ['phoneInfo', 'phoneUuid']
      })
      .then((phones) => {
        console.log("Got phones");
        const phoneArray = [];
        phones.forEach((phone) => {
          phoneArray.push({
            phoneUuid: phone.phoneUuid,
            phoneInfo: JSON.parse(phone.phoneInfo)
          })
        });
        res.status(200).send(phoneArray);
      })
      .catch(error => res.status(400).send(error));
  },
  
  // This function is super ugly because the relations in sequelize aren't working.
  readingPhones(req, res) {
    let serverDeviceId = req.params.serverDeviceId;
    if ( serverDeviceId === null || serverDeviceId === undefined ) {
      returnError('Incorrect format');
      return;
    }
    const phoneArray = [];
    let phoneDevices = 0;
    function phoneCallback(phone) {
      phoneDevices -= 1;
      phoneArray.push({
        phoneUuid: phone.phoneUuid,
        phoneInfo: JSON.parse(phone.phoneInfo)
      })
      if ( phoneDevices == 0 ) {
        res.status(200).send(phoneArray);
      }
    }
    
    Device.findOne({
      attributes: ['id'],
      where: {
        serverDeviceId: serverDeviceId
      }
    }).then( (device) => {
      if ( device !== null ) {
        PhoneDevice.findAll({
          where: {
            deviceId: device.id
          }
        }).then( (phonedevices) => {
          phonedevices.forEach( (phonedevice) => {
            console.log(phonedevice.phoneId);
            phoneDevices += 1;
            Phone.findOne({
              where: {
                id: phonedevice.phoneId
              }
            }).then(phoneCallback);
          });
        });
      }
    }).catch( (error) => {
      console.log(error);
    });
  }
}