# homebridge-doorsensor

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which can either monitor 1) a contact / door sensor connected to power and a GPIO pin or 2) a file populated with a 1 or a 0 that serves the same purpose.
My configuration uses a reed switch connected to numbered pins 17 (3.3v DC Power) and 18 (GPIO_GEN5).
The other option is to use a file popluated with a 0 or a 1 by an external application. This plugin will read the file to determine the sensor state.
The flipBehavior flag allows you to switch the reported status.

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
    "sensorPollInMs": 5000,
    "flipBehavior": false,
    "sensorPin": 18,         /* sensorPin or triggerFile required */
    "triggerFile": "file"    /* but not both */
  }
```
