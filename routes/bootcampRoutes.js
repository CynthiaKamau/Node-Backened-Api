const express = require('express');

const { 
    getBootcamps, 
    getBootcamp,
    createBootcamp,
    updateBootcamp, 
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampUploadPhoto
 } = require('../controllers/bootcampController');

const Bootcamp = require('../models/Bootcamp');
 const advancedResults = require('../middleware/advancedResults');

 // Include other resource routers
const courseRouter = require('./coursesRoutes');

const router = express.Router();

  //Re-route to other resource routers
router.use('/:bootcampId/courses', courseRouter);
 
router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);

router.route('/:id') 
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp); 
    
router.route('/raduis/:zipcode/:distance').get(getBootcampsInRadius);   

router.route('/:id/photo').put(bootcampUploadPhoto);

module.exports = router;