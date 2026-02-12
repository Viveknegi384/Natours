const express = require("express")
const tourController = require("../controllers/tourController") //import karna
//instead of above we can also do that by desructuring
const authController = require("../controllers/authController")
// const reviewController = require("../controllers/reviewController")
const reviewRouter = require('./reviewRoutes');

const router = express.Router();




// router.param('id', (req, res, next, val) => { //new par. val is added
//     console.log(`Tour id is: ${val}`); //value is used to store id value
//     next();
// })

// router.param('id',tourController.checkID); //As we had comment it in controller

/* 
chaining multiplemiddleware function
Create a checkBody middleware (means check karsakte h uss POST req ko api or db mai bhjna h ya nahi)
If not,send back 400 (bad request)
Add it to the post handler stack
*/


// router.route('/:tourId/reviews').post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
// );

router.use('/:tourId/reviews', reviewRouter); 

router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTour)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'lead-guide',"guides"),tourController.getMonthlyPlan)

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
    .route('/')
    .get(tourController.getAllTour)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour); 

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'),tourController.uploadTourImages,tourController.resizeTourImages,tourController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);




module.exports = router;
