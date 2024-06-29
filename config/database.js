const mongoose = require('mongoose')

const connectDatabase = () => { mongoose.mongoose.connect(process.env.DB_URI, {

   


}).then(con => {
    console.log(`MongoDB Database connected with host: ${con.connection.host}`);

});

};

module.exports = connectDatabase