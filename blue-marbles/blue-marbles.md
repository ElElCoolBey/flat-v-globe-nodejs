# Blue marbles

This module connects to the NASA API (feel free to use a VPN if you think *they* are coming after you) and returns the images of Earth taken by the EPIC (Earth Polychromatic Imaging Camera) for any given day between 06/07/2015 and yesterday/today (depending on your timezone).
 
The flat Earther script says they have to ask for photos of Earth that aren't composite (because they don't trust panoramic images for some reason), aren't CGI, and show curvature.
 
These images fit that bill perfectly, as explained at [https://epic.gsfc.nasa.gov/about/epic](https://epic.gsfc.nasa.gov/about/epic) :
 
> ## WHAT IS EPIC?
> 
> EPIC (Earth Polychromatic Imaging **Camera**) is a 10-channel spectroradiometer (317 – 780 nm) onboard NOAA’s DSCOVR (Deep Space Climate Observatory) spacecraft. EPIC provides 10 narrow band spectral images of **the entire sunlit face of Earth** using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain **telescope** (Figure 1).
>
>The DSCOVR spacecraft is located at the Earth-Sun Lagrange-1 (L-1) point giving EPIC a unique angular perspective that will be used in science applications to measure ozone, aerosols, cloud reflectivity, cloud height, vegetation properties, and UV radiation estimates at Earth's surface.
>
> ## TEN CHANNELS
> The ten channels are listed in Table 1 along with their primary applications for the data that will be obtained for the entire globe (sunrise to sunset) every 60 to 100 minutes.
>
> ## FIELD OF VIEW THAT EPIC SEES
>The EPIC instrument has a field of view (FOV) of 0.62 degrees, which is **sufficient to image the entire Earth**, which has a nominal size of 0.5 degrees. Because of the tilted (Lissajous) orbit about the L‐1 point, the apparent angular size of the Earth changes during the 6-month orbital period from 0.45 to 0.53 degrees.
>

## How to run the module

1. Set your observation date
   * Open `blue-marbles/index.js` 
   * Enter an observation date between 06/07/2015 and yesterday (Today's date may or may not work depending on your timezone) using the `YYYY-MM-DD` format
   * Save the file
2. Run the module
   * Open a terminal window and run `node blue-marbles` from the root of the project
   * The console should show `Data successfully saved` and `Downloading PNG from...` messages as each function is completed
   * Once complete, there should be a folder in `data` for the year of your observation date
   * Within that will be a folder for the month of your observation
   * Within that will be a folder for the date of your observation
   * Within that folder will be a `blue-marble-data.json` file and a series of PNG images
3. Perform your analysis and observations

   * Analyse the images for evidence of forgery
   * Cross reference the `centroid-coordinates` against Google Maps, the Azimuthal equidistant projection of the globe and any other heliocentric based tools you have
   * Now compare the images to the Azimuthal equidistant projection of the globe as if it were a flat Earth map and not a projection of the globe

## Analysis and observations

### Analyse the images for evidence of forgery

There are thousands of images available via this module. So far, no flat Earthers have been able to find any evidence of forgery in any of the images, but I'm sure if anyone can it'll be some random conspiracy "theorist" on Twitter. Because *they* have managed to get this supposedly fake globe to match every measured observation in over two thousand years, only for someone with a name like @dometruther35731818093570 to blow it wide open.

> Is there evidence of forgery? - If yes, one point deducted from the heliocentric model for each verified instance. If no, one point awarded to the heliocentric model for each image
> 
> Is there curvature visible? If yes, one point awarded to the heliocentric model for each image
> 
> Is an ice wall visible around a flat disc? If yes, one point awarded to flat Earth for each image

### Cross reference the centroid coordinates

* Open the `blue-marble-data.json` file for the given observation day
* Take the `centroid_coordinates.lat` and `centroid_coordinates.lon` values for a given image
* Paste/plot those values in whichever service/tool you're cross referencing with
  * [Google maps](https://www.google.com/maps) (Search using `lat, lon`)
  * Azimuthal equidistant projection of the globe (Plot manually on the image located in the `img` folder)
  * [https://suncalc.org](https://suncalc.org) (Search using `lat, lon`)
  * [Open street map](https://www.openstreetmap.org/) (Search using `lat, lon`)

> Does each heliocentric based tool match the photo? - One point awarded to the heliocentric model for each matching image

### Compare the shape of land masses to "flat Earth map"

* Compare the shape of land masses in the image to a "flat Earth map" if you can find one
* If you can't find one, use the Azimuthal equidistant projection of the globe, but do not treat it as a projection. Use it only as a map, so Australia should look like a rasher of bacon in the image if Earth is flat rather than allowing for distortion. East/West should also be drawn as straight lines

> Do the shape of land masses match? Award one point to flat Earth for each matching image
> Does the flat Earth "map" match any globe projections? Deduct one point from flat Earth for each image where they have attempted to use the heliocentric model


### Plot the positions of Earth, DSCOVR, the Sun and the Moon (Advanced - Work in progress)

I'm currently working on the instructions for this and/or some code to generate this as an SVG. If you know your shit when it comes to plotting 3D SVGs please [get in touch](https://twitter.com/elelcoolbey).

We see in the images and on the [info page](https://epic.gsfc.nasa.gov/about/epic) that EPIC captures the entire sunlit side of Earth, so it stands to reason that DSCOVR is positioned directly between Earth and the Sun.

The site also contains information on DSCOVR's distance from Earth, and the Sun's distance from Earth, so it should be possible to use these values along with `dscovr_j2000_position`, `lunar_j2000_position` and `sun_j2000_position` to generate a 3D image to compare this.


