# Star chart generator

Set your observation location and date in `config.js` at the root of the app and set the star chart values in `star-chart-generator/index.js`

style can be: "default" | "inverted" | "navy" | "red"

view can be: "constellation" | "area"

If you choose constellation, one of the three digit constellation codes from `constellation-enums.md` must be included, for example constellation: "ori" to generate the area around Orion

If you choose area, you must set the rightAscension and declination values

## How to run this module

1. Open a terminal window at the root of the project
2. Run `node star-chart-generatrr` 
3. The app will connect to the API and get a generated star chart for the given location. Once completed, the data will be saved in the `star-chart-generator/data` folder under `latitude`_`longitude`
4. There will be a JPG image containing the star chartr
5. Go outside and verify it with your own eyes
6. If you believed Earth was flat, you now have to start calling yourself a NASA shill on social media