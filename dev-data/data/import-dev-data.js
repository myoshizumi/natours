const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful');
    });

// Read JSON file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import Data Into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
    } catch (err) {
        console.log('err');
    }
    process.exit();
};

// Delete All Data From Collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    } catch (err) {
        console.log('err');
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);