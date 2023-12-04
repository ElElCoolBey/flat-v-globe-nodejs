import fs from 'fs';
import dayjs from "dayjs";
import axios from 'axios';
import 'dotenv/config';

// Enter a date between 
const observationDate = dayjs('2023-11-20');
const queryDate = dayjs(observationDate).format('YYYY-MM-DD');

const imageTypes = [
    { name: 'natural', identifierPrefix: "epic_1b" },
    { name: 'enhanced', identifierPrefix: "epic_RGB" },
    { name: 'aerosol', identifierPrefix: "epic_uvai" },
    { name: 'cloud', identifierPrefix: "epic_cloudfraction" }
];

const dataFolderPath = `blue-marbles/data/${observationDate.format('YYYY')}/${observationDate.format('MM')}/${observationDate.format('DD')}`;

const downloadPNG = async (url, filepath) => {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    console.log('Downloading PNG from: ', url, ' | Saving to: ', filepath);

    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath))
    });

}

const getBlueMarbles = async () => {

    if (!fs.existsSync(dataFolderPath)) {
        fs.mkdirSync(dataFolderPath, { recursive: true });
    }

    const res = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${queryDate}?api_key=${process.env.NASA_API_KEY}`
    );

    const jsonData = JSON.stringify(res.data);

    fs.writeFile(`${dataFolderPath}/blue-marble-data.json`, jsonData.toString(), () => {
        console.log(`Data successfully saved to ${dataFolderPath}/blue-marble-data.json, which contains data for ${res.data.length} images.`)
    });

    res.data.map(image => {

        const imageURL = `https://epic.gsfc.nasa.gov/archive/natural/${dayjs(queryDate).format('YYYY')}/${dayjs(queryDate).format('MM')}/${dayjs(queryDate).format('DD')}/png/epic_1b_${image.identifier}.png`
        const imageNamePNG = image.image + '.png'

        downloadPNG(imageURL, `${dataFolderPath}/${imageNamePNG}`)

    });

};

getBlueMarbles();
