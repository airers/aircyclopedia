const app = new Vue({
  data: {
    devices: null,
    readings: null,
    phones: null,
    selectedDevice: null
  },
  methods: {
    loadDevices: function() {
      this.devices = null;
      
      axios.get('/api/v1/devices')
      .then((response) => {
        this.devices = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    loadReadings: function(device) {
      this.phones = null;
      this.selectedDevice = device.sensorUuid;
      console.log(device);
      this.readings = null;
      axios.get('/api/v1/devices/'+device.serverDeviceId+'/readings')
      .then((response) => {
        this.readings = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    loadPhones: function(device) {
      this.readings = null;
      this.selectedDevice = device.sensorUuid;
      console.log(device);
      this.readings = null;
      axios.get('/api/v1/devices/'+device.serverDeviceId+'/phones')
      .then((response) => {
        this.readings = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  },
  created: function() {

  }
}).$mount('#aircyclopediaApp');