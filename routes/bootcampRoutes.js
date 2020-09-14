const express = require('express');

const { 
    getBootcamps, 
    getBootcamp,
    createBootcamp,
    updateBootcamp, 
    deleteBootcamp,
    getBootcampsInRadius
 } = require('../controllers/bootcampController');

 // Include other resource routers
const courseRouter = require('./coursesRoutes');

const router = express.Router();

  //Re-route to other resource routers
router.use('/:bootcampId/courses', courseRouter);
 
router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id') 
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp); 
    
router.route('/raduis/:zipcode/:distance').get(getBootcampsInRadius);   

module.exports = router;