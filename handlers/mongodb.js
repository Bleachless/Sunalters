const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = () => {
    mongoose.connect(process.env.MONGODB, {
    }).then(() => {
        console.log(chalk.green('Connected to MongoDB 🔥'))
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ' + err)
    })

}