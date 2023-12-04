# Planet locator

> Planets, the Sun, the Moon and Pluto locator, but would you really want to type all that to run the module?

This module connects to [Astronomy API](https://astronomyapi.com) (feel free to use a VPN if you think *they* are coming after you), passes your configured observation location data and returns the position of every body (The Sun, the Moon, every planet and Pluto) for that location at that time on that date.

You can then verify the position(s) on the date with a compass and sextant, and/or telescope to test the validy of the heliocentric model used to calculate the positions in advance


## How to run the module

1. Open `config.js` from the root of the project
2. Enter values for the `observer` object - This is where and when you would be performing the observation
   * latitude - In decimal degrees
   * longitude - In decimal degrees
   * elevation - In metres
   * date - YYYY-MM-DD
   * time: HH:mm:ss
3. Save the file
4. Open a terminal window from the root of the project
5. Run `node planet-locator`
6. The console will inform you when the data has been saved
7. The `planet-locator/data` folder should now contain a folder for the year of your observation
8. Within that should be a folder for the month of your observation
9. Within that should be a folder for the day of your observation
10. Within that should be a JSON file with the date and time as the filename
11. In the file is a JSON object containing `data.table.rows`, which is an array containing a row object for each body
    * The Sun
    * The Moon
    * Mercury
    * Venus
    * Earth
    * Mars
    * Jupiter
    * Saturn
    * Uranus
    * Neptune
    * Pluto
12. `data.table.rows[index].cells` is an array containing a single object, which itself contains the `azimuth` and `altitude` for you to locate your chosen body from your specified location


## Analysis and observations

### Test a future date and time

* Based on the fact this API uses the Heliocentric model, try entering a date in the future and then verifying the Sun or Moon's position on the day and see how accurate the Heliocentric model is - The azimuth can be checked with a compass and the altitude with a sextant.

I have tested this up to six months in advance and am yet to see a failed prediction.