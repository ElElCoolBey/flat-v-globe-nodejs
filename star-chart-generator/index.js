import http from "https";
import fs from 'fs';
import dayjs from "dayjs";
import config from "../config.js";
import 'dotenv/config';

// style can be: "default" | "inverted" | "navy" | "red"
// view can be: "constellation" | "area"
// If you choose constellation, one of the three digit constellation codes from `constellation-codes.js` must be included, for example constellation: "ori" to generate the area around Orion
// If you choose area, you must set the rightAscension and declination values

// const chartConfig = {
//     style: 'default',
//     view: {
//         type: 'area',
//         parameters: {
//             position: {
//                 equatorial: {
//                     rightAscension: 20.24,
//                     declination: -12.75
//                 }
//             }
//         }
//     }
// }

const chartConfig = {
    style: 'default',
    view: {
        type: 'constellation',
        parameters: {
            constellation: 'uma'
        }
    }
}

const observationDate = dayjs(config.observer.date);

const options = {
    "method": "POST",
    "hostname": "api.astronomyapi.com",
    "port": null,
    "path": `/api/v2/studio/star-chart`,
    "headers": {
        "Authorization": process.env.ASTRONOMY_API_AUTH
    },
    body: {
        style: chartConfig.style,
        observer: {
            latitude: config.observer.latitude,
            longitude: config.observer.longitude,
            date: config.observer.date
        },
        view: chartConfig.view
    }
};

console.log('path: ', options.hostname + options.path);

const req = http.request(options, function (res) {
    const chunks = [];

    res.on('error', (error) => console.log(error))

    res.on("data", function (chunk) {
        console.log('chunk: ', chunk)
        chunks.push(chunk);
    });

    res.on("end", function () {
        const bodyOfData = Buffer.concat(chunks);

        const dateString = observationDate.format('YYYY-MM-DD HH:mm:ss');

        const fileDate = dayjs(dateString).format('YYYY_MM_DD_HH_mm');

        const dataFolderPath = `star-chart-generator/data/${dayjs(config.observer.date).format('YYYY-MM-DD')}_${config.observer.latitude}_${config.observer.longitude}`;

        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath, { recursive: true });
        }

        fs.writeFile(`${dataFolderPath}/${fileDate}-${chartConfig.view.type}.jpg`, bodyOfData, () => {
            console.log(`Your data has been saved to ${dataFolderPath}/${fileDate}-${chartConfig.view.type}.jpg`)
        })

    });
});

req.end();


