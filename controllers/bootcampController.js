const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = {...req.query}; 

    // Fields to exclude
    const removeFileds = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from requery
    removeFileds.forEach(param => delete reqQuery[param]);

    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);

    // CREATE OPERATORS ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding a resource
    query = Bootcamp.find(JSON.parse(queryStr));

    // Select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
        console.log(fields);
    }

    // Sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);

    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const bootcamps = await query;

    // Pagination result
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(200).json({ success: true, data: bootcamps, pagination: pagination, totals: bootcamps.length });

});

// @desc    Get single bootcamps
// @route   Get /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp =  asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp) {
            next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: bootcamp});

});

// @desc    Create new bootcamp
// @route   Post /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
        success: true,
        data: bootcamp
    });

});

// @desc    Update bootcamp
// @route   Put /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp) {
            next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({ success: true, data: bootcamp });

});

// @desc    Delete bootcamps
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp) {
            next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({ success: true, data: bootcamp });
        
});

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radiuss/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {

    const {zipcode, distance} = req.params;

    //Get lat/long from geocoder

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide distance by radius
    // Earth radius = 3963 mi / 6378 km

    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location : { $geoWithin: { $centerSphere: [ [ lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });

    // if(!bootcamp) {
    //     next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    // }

    // res.status(200).json({ success: true, data: bootcamp });
    
});


