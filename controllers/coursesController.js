const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')

// @desc    Get all courses
// @route   Get /api/v1/courses
// @access  Public
exports.getCourses = asyncHandler( async (req, res, next) => {
    let query;

    if(req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    // Executing query
    const course = await query;

    res.status(200).json({
         success: true, 
         data: course, 
        totals: course.length });

});