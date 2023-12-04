import http from "https";
import fs from 'fs';
import dayjs from "dayjs";
import config from "../config.js";
import 'dotenv/config';

const observationDate = dayjs(config.observer.date);
const observationTime = dayjs(config.observer.date + ' ' + config.observer.time).format('HH:mm:ss');



let earthDiameter = config.earth.diameter.miles;
let domeHeight = config.domeHeight.miles;

const options = {
    "method": "GET",
    "hostname": "api.astronomyapi.com",
    "port": null,
    "path": `/api/v2/bodies/positions?longitude=${config.observer.longitude}&latitude=${config.observer.latitude}&elevation=${config.observer.elevation}&from_date=${observationDate.format('YYYY-MM-DD')}&to_date=${observationDate.format('YYYY-MM-DD')}&time=${observationTime}`,
    "headers": {
        "Authorization": process.env.ASTRONOMY_API_AUTH
    }
};

console.log('path: ', options.path);

const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());

        const dateString = observationDate.format('YYYY-MM-DD') + ' ' + observationTime

        const fileDate = dayjs(dateString).format('YYYY_MM_DD_HH_mm')

        const dataFolderPath = `planet-locator/data/${observationDate.format('YYYY')}/${observationDate.format('MM')}/${observationDate.format('DD')}`;

        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath, { recursive: true });
        }


        fs.writeFile(`${dataFolderPath}/${fileDate}.json`, body.toString(), () => {
            console.log(`Your data has been saved to ${dataFolderPath}/${fileDate}.json`)
        })

    });
});

req.end();