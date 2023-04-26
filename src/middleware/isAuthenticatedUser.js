const User = require('../Models/userModel');
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { jwttoken } = req.cookies;
        // console.log(jwttoken);
        if (!jwttoken) {
            return res.status(200).json({ msg: 'error', response: 'You are not logged in, please login first.' });
        }
        const decoded = jwt.verify(jwttoken, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id);
        // console.log(req.user.id);
        next();
    } catch (error) {
        return res.status(200).json({ msg: 'token_error', response: 'Invalid Token.' });
    }
}

// exports.isAuthorizedUser = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(200).json({ msg: 'error', response: `Role (${req.user.role}) is not allowed to acccess this resource` });
//         }
//         next()
//     }
// }