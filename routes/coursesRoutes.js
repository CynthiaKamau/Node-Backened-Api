const express = require('express');

const { 
    getCourses
    // getCoursesInRadius,
    // createCourse,
    // updateCourse, 
    // deleteCourse
 } = require('../controllers/coursesController');
 
 const router = express.Router( { mergeParams: true});

 router.route('/').get(getCourses);

 module.exports = router;