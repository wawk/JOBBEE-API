const User = require('../models/users');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken =  require('../utils/jwtToken');

//Get current user profile => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({

        success : true,
        data : user


    });

});

// update current user password => /api/v1/password/change
exports.updatePassword = catchAsyncErrors( async(req,res,next) => {

    const user = await User.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.currentPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Password is incorrect.', 401));

    }
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);

});

// Update current user data => /api/v1/me/update
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: false,
        data: user
    });

});

// Delete current user => /api/v1/me/delete
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {

   const user = await  User.findByIdAndDelete(req.user.id);

res.cookie('token', 'none',{
expires : new Date(Date.now()),
httpOnly: true

});

res.status(200).json({
success: true,
message : 'your account has been deleted.'
});
});
