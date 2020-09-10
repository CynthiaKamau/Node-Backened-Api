// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, data: 'Show all bootcamps', spanish: req.hello });

}

// @desc    Get single bootcamps
// @route   Get /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, data: 'Show a bootcamp' });

}

// @desc    Create new bootcamp
// @route   Post /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, data: `Create a bootcamp` });

}

// @desc    Update bootcamp
// @route   Put /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, data: `Update a bootcamp ${req.params.id}` });

}

// @desc    Delete bootcamps
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, data: `Delete a bootcamp ${req.params.id}` });

}

