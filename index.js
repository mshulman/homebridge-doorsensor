//        {
//             "accessory": "DoorSensor",
//             "name": "Garage Door",
//	       "sensorPin": 18,
//	       "sensorPollInMs": 5000
//        }

var Service, Characteristic, DoorState;
var rpio = require('rpio');

module.exports = function(homebridge){
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	DoorState = homebridge.hap.Characteristic.CurrentDoorState;
	homebridge.registerAccessory("homebridge-doorsensor", "DoorSensor", DoorSensorAccessory);
};

function DoorSensorAccessory(log, config) {
	this.log = log;
	this.name = config.name;
	this.sensorPin = config.sensorPin;
	rpio.open(this.sensorPin,rpio.INPUT, rpio.PULL_DOWN);

	this.sensorPollInMs = config.sensorPollInMs;

	this.isClosed = true; 
	this.wasClosed = true; 

	this.service = new Service.ContactSensor(this.name);
	setTimeout(this.monitorDoorState.bind(this), this.sensorPollInMs);
};

DoorSensorAccessory.prototype = {
	identify: function(callback) {
		this.log("Identify requested!");
		callback(null);
	},

	monitorDoorState: function() {
		this.isClosed = this.isDoorClosed();
		if (this.isClosed != this.wasClosed) {
			this.wasClosed = this.isClosed;
			this.service.getCharacteristic(Characteristic.ContactSensorState).setValue(this.isClosed);
	                this.log("monitorDoorState: " + this.isClosed);
		}
		setTimeout(this.monitorDoorState.bind(this), this.sensorPollInMs);
	},

	isDoorClosed: function() {
		return !rpio.read(this.sensorPin);
	},

	getContactSensorState: function(callback) {
		this.isClosed = this.isDoorClosed();
		this.log("getContactSensorState: ", this.isClosed);
		callback(null, this.isClosed);
	},

	getName: function(callback) {
		this.log("getName :", this.name);
		callback(null, this.name);
	},

	getServices: function() {
		var informationService = new Service.AccessoryInformation();

		informationService
			.setCharacteristic(Characteristic.Manufacturer, "DoorSensor")
			.setCharacteristic(Characteristic.Model, "MyDoor")
			.setCharacteristic(Characteristic.SerialNumber, "Version 0.0.1");

		this.service
			.getCharacteristic(Characteristic.ContactSensorState)
			.on('get', this.getContactSensorState.bind(this));

		this.service
			.getCharacteristic(Characteristic.Name)
			.on('get', this.getName.bind(this));

		return [informationService, this.service];
	}
};
