const express  = require('express');
const app = express();
//express is a framework of node.js 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


// connect to mongo db, Mongo_Atlas_PW(Mongo db password)is stored in nodemon.json file
// process.env is an object in Node.js that provides access to environment variables.
mongoose.connect('mongodb+srv://ywansheng:' + process.env.Mongo_Atlas_PW + '@niuroucluster.unjtmkd.mongodb.net/?retryWrites=true&w=majority');
/*In Node.js and many other programming environments, environment variables are global variables that are set by the operating system or by the process running your application. They are accessible throughout your application and can be used to store sensitive information, configuration values, API keys, database connection strings, and more. */


// morgan is a http request logger middleware 
app.use(morgan('dev'));
/* morgan('dev'): This line is adding the morgan middleware to the pipeline. The argument 'dev' specifies a predefined logging format for development purposes. The 'dev' format will log the incoming request method, URL, status code, response time, and size of the response. */

// bodyparser is a body-parsing middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// to use this, you need pass the a json file into the body of the request.

// to prevent CROS error
/*app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
});
*/


app.use('/products',productRoutes);
app.use('/orders', orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error); // use next() function to pass the error to next midlleware
});

// use the error messege from last middle ware 
app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;