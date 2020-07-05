const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.set('useUnifiedTopology', true);

const connectDB = async () => {
    try {
       await mongoose.connect(db, {
           useNewUrlParser: true
       });
       console.log('MongoDB Connected');
    } catch(err) {
        console.log(err.message);
        // Exit process if an error occurs
        process.exit(1);
    }
}

module.exports = connectDB;