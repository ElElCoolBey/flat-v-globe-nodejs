import http from "https";
import fs from 'fs';
import dayjs from "dayjs";
import config from "../config.js";
import 'dotenv/config';

const bodies = ['sun', 'moon'];

const observationDate = dayjs();
const observationTime = dayjs().format('HH:mm:ss');

bodies.map(body => {

    const options = {
        "method": "GET",
        "hostname": "api.astronomyapi.com",
        "port": null,
        "path": `/api/v2/bodies/events/${body}?latitude=${config.observer.latitude}&longitude=${config.observer.longitude}&elevation=${config.observer.elevation}&from_date=${observationDate.format('YYYY-MM-DD')}&to_date=${observationDate.format('YYYY-MM-DD')}&time=${observationTime}`,
        "headers": {
            "Authorization": process.env.ASTRONOMY_API_AUTH
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const bodyOfData = Buffer.concat(chunks);

            const dateString = observationDate.format('YYYY-MM-DD') + ' ' + observationTime

            const fileDate = dayjs(dateString).format('YYYY_MM_DD_HH_mm')

            const dataFolderPath = `events-reporter/data/${config.observer.latitude}_${config.observer.longitude}`;

            if (!fs.existsSync(dataFolderPath)) {
                fs.mkdirSync(dataFolderPath, { recursive: true });
            }


            fs.writeFile(`${dataFolderPath}/${fileDate}-${body}.json`, bodyOfData.toString(), () => {
                console.log(`Your data has been saved to ${dataFolderPath}/${fileDate}/${body}.json`)
            })

        });
    });

    req.end();

});

