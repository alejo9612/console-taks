const fs = require('fs');
const File = './db/data.json';

const saveDB = (data) => {

    fs.writeFileSync(File, JSON.stringify(data));
}

const readDB = () => {

    if (!fs.existsSync(File)) {
        return null
    }

    const info = fs.readFileSync(File, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
}

module.exports = {
    saveDB,
    readDB
}