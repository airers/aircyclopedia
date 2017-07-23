const Phone = require('../models').Phone;

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
  }
}