# ISS locator

Connects to [http://api.open-notify.org](http://api.open-notify.org) and returns the current position of the International Space Station
No API keys or configuration is required.

## How to run this module

1. Open a terminal window at the root of the project
2. Run `node iss-locator` 
3. The current position of the ISS will be printed in the console and saved in the `iss-locator/data` folder under year/month/date


## Analysis

As with the other modules, this uses globe based coordinates.

Sooner or later the ISS should pass overhead at night so you can see it with the naked eye. You can set your location and sign up for alerts at [https://spotthestation.nasa.gov/sightings/index.cfm](https://spotthestation.nasa.gov/sightings/index.cfm)

This now gives us two independent sources.

When you get your alert, run the module.

Do both sources have the ISS passing over your location?

Go outside and look up.

Looking in the direction given in the alert, can you see the ISS with your own eyes? 

> If you answered yes to either question (and let's face it, you answered yes to both) Earth is not flat, there is no dome and satellites and space are real.

