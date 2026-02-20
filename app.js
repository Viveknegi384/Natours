const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const bookingConroller = require("./controllers/bookingController");
const viewRouter = require("./routes/viewRoutes");

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) GLOBAL MIDDLEWARES

//Implement CORS
app.use(cors());
//Access-Control-Allow-Origin *
//api.natours.com, front-end natours.com
// app.use(cors({
//     origin: 'https://www.natours.com'
// }));

app.options('*', cors()); //to allow preflight phase for all routes, for complex requests like patch, delete, put etc. which are not simple requests and require preflight phase. This will allow all the options request to be handled by cors middleware.
//app.options('/api/v1/tours/:id', cors()); //to allow preflight phase for specific route. This will allow options request for this specific route to be handled by cors middleware. This is for complex requests like patch, delete, put etc. which are not simple requests and require preflight phase.

//serving static file
app.use(express.static(path.join(__dirname, 'public')));

//set security http headers
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'https://unpkg.com', 'https://js.stripe.com'],
            scriptSrcElem: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', 'https://js.stripe.com'],
            styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://unpkg.com', "'unsafe-inline'"],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: [
                "'self'",
                'data:',
                'blob:',
                'https://unpkg.com',
                'https://*.tile.openstreetmap.org',
                'https://cartodb-basemaps-a.global.ssl.fastly.net',
                'https://cartodb-basemaps-b.global.ssl.fastly.net',
                'https://cartodb-basemaps-c.global.ssl.fastly.net',
                'https://cartodb-basemaps-d.global.ssl.fastly.net'
            ],
            connectSrc: [
                "'self'",
                'https://unpkg.com',
                'https://*.tile.openstreetmap.org',
                'https://cartodb-basemaps-a.global.ssl.fastly.net',
                'https://cartodb-basemaps-b.global.ssl.fastly.net',
                'https://cartodb-basemaps-c.global.ssl.fastly.net',
                'https://cartodb-basemaps-d.global.ssl.fastly.net',
                'https://natours-tvii.onrender.com'
            ],
            frameSrc: ["'self'", 'https://js.stripe.com']
        }
    })
);

//development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//limit requests from same API
const limiter = rateLimit({
    max: 100, //max requests from same IP
    windowMs: 60 * 60 * 1000, //1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); //to apply this limiter only on routes which start with /api

app.post('/webhook-checkout',express.raw({type: 'application/json'}), bookingConroller.webhookCheckout); 

//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //body size is limited to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS attacks
app.use(xss());

//Prevent parameter pollution
app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}
));
app.use(compression());

//test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(x); //error in postman
    // console.log(req.headers);
    console.log(req.cookies);
    next();
});

// console.log(x); //error in console handle by uncaught exception

//3) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter); //for this routes we want to apply this tourRouter middleware
app.use('/api/v1/users', userRouter);
//here above tourRouter and userRouter are the two middleware which are then mount through app.use
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Cant't find ${req.originalUrl} on this server!`
    // })

    /*
    const err= new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status= 'fail';
    err.statusCode =404;

    next(err);
    */

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;