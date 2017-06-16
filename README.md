# homebridge-doorsensor

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which monitors a contact / door sensor connected to power and a GPIO pin.
My configuration uses a reed switch connected to numbered pins 17 (3.3v DC Power) and 18 (GPIO_GEN5).

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-doorsensor
3. Follow the install instructions for [rpio](https://www.npmjs.com/package/rpio)
4. Update your configuration file. See below for a sample.

## Example config

```json
  {
    "accessory": "DoorSensor",
    "name": "Garage Door",
    "sensorPin": 18,
    "sensorPollInMs": 5000
  }
```
