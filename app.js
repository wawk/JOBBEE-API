const express = require('express');
const multer = require('multer');

const app = express();

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv')
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middleware/errors');
const errorHandler = require('./utils/errorHandler');

//Setting up config.env file variables
dotenv.config({path: './config/config.env'})

//Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});


//connecting to database
connectDatabase();

//Setting up body parser
app.use(express.json());



// Handle file uploads
app.use(fileUpload());

// Set cookie parser
app.use(cookieParser());




// Importing all routes
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');
const user = require('./routes/user');

const PORT = process.env.PORT;



app.use('/api/v1', jobs);

app.use('/api/v1', auth);

app.use('/api/v1', user);


// Handle unhandled routes
app.all('*', (req,res, next) => {
next(new errorHandler(`${req.originalUrl} route not found`, 404));

});

// Middleware to handle errors
app.use(errorMiddleware);



const server = app.listen(PORT, () => {
    console.log(`Server started on Port:  ${PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handling unhandles Promise rejection
process.on('unhandledRejection', err => {

    console.log(`Error: ${err.message}`);

    console.log('Shutting down the server due to unhandled promise rejection.');
    server.close(() => {
        process.exit(1);
    });


});