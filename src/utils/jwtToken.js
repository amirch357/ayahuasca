const sendToken = (userLogin, res) => {
    console.log(userLogin);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie("token", token, options).json({
        success: true,
        token,
        userLogin,
    });
};
module.exports = sendToken;
