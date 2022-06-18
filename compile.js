const fs = require("fs");

const path = "./assets/contact";
const color = "#d4d4d4";

const p = `${path}/src`;

const dir = fs.
    readdirSync(p)
    .map(file => [ file, fs.readFileSync(`${p}/${file}`, "utf-8") ])
    .map(([ file, data ]) => [ file, data.replace("__FILL__", color)])
    .forEach(([ file, data ]) => fs.writeFileSync(`${path}/dist/${file}`, data));

console.log(dir);
