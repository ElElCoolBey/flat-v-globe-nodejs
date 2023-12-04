# Events reporter

Set your observation location in `config.js` at the root of the app and then run the module

## How to run this module

1. Open a terminal window at the root of the project
2. Run `node events-reporter` 
3. The app will connect to the API and get any event data for the given location. Once completed, the data will be saved in the `events-reporter/data` folder under `latitude`_`longitude`
4. There will be a JSON file for the Sun and another for the Moon
5. If the cells array is empty, there are no upcoming events visible from that location
6. If an event is contained in the cells array, set a reminder for the event date and verify it with your own eyes - See if you start calling yoursef a NASA shill on social media.