import fs from 'fs';
import dayjs from "dayjs";
import axios from 'axios';

const observationDate = dayjs();
const issLocation = await axios.get('http://api.open-notify.org/iss-now.json')

console.log('issLocation: ', issLocation.data);

const jsonData = JSON.stringify(issLocation.data);

const dataFolderPath = `iss-locator/data/${observationDate.format('YYYY')}/${observationDate.format('MM')}/${observationDate.format('DD')}`;

if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath, { recursive: true });
}

fs.writeFile(`${dataFolderPath}/${observationDate.format('HH_mm_ss')}-iss-location.json`, jsonData, () => {
    console.log(`Data successfully saved to ${dataFolderPath}/${observationDate.format('HH_mm_ss')}-iss-location.json.`)
});