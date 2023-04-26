const bcrypt = require("bcryptjs")
const AdminUsers = require('../Models/AdminUserModel');
const Stripe = require('stripe')("sk_test_51LgbR6LNnAduS9ocDFC4x4hwzw8TTSInXFppl7Yb8NfBnTrI7rjifgOu8InBOU13zi3SEXP8klNeEVUEbBiXTLVa00NHSrmYn7");
const nodemailer = require('nodemailer');

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ status: false, msg: "All fields are required." });
        } else {
            let userExists = await AdminUsers.findOne({ email: email });
            if (userExists) {
                return res.json({ status: false, msg: "This Email Address is Already Registered." });
            }
            const admin_users = new AdminUsers({ username, email, password });
            admin_users.save().then(() => {
                return res.json({ status: true, msg: "Successfully registered." });
            }).catch((err) => { return res.json({ status: false, msg: err }); })
        }
    } catch (error) {
        return res.json({ status: false, msg: "Something went wrong. please try again." });
    }
}

const verify_login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ msg: 'error', response: "All fields are required." });
        }

        let adminLogin = await AdminUsers.findOne({ email: email });
        if (adminLogin) {
            const pass = await bcrypt.compare(password, adminLogin.password);

            if (!pass) {
                return res.json({ msg: 'error', msg: "User not found." });
            } else {
                const token = await adminLogin.generateToken();
                const refreshToken = await adminLogin.generateRefreshToken();
                adminLogin.token = token
                adminLogin.refreshToken = refreshToken

                res.cookie(
                    'jwttoken', token, {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
                    path: 'http://localhost3000',
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });


                return res.json({ msg: 'success', response: "User LogedIn Success.", adminLogin });
            }
        } else {
            return res.json({ msg: 'error', response: "Email or Password incorrect." })
        }
    } catch (error) {
        return res.json({ msg: 'error', response: "Something went wrong." });
    }
}

const create_charge = async (req, res, next) => {

    try {
        const { totalAmount, token, email, fullname, description } = req.body;
        const Customer = await Stripe.customers.create({
            name: fullname,
            email: email,
          });
        const charge = await Stripe.charges.create({
            currency: 'usd',
            amount: totalAmount,
            description: description,
            source: token.id,
        });
       
        console.log(Customer);
        var amountindoller = (totalAmount / 100);
        if (charge.status === "succeeded") {
            try {
                const client = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "muhammadishtiaqamjad@gmail.com",
                        pass: "uducramaimkszttu"
                    }
                });
                const mailOptions = (
                    {
                        from: 'muhammadishtiaqamjad@gmail.com',
                        to: email,
                        subject: "subject",
                        html: `

                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:470px; margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align:center;">
                                                        <a href="http://localhost:3000/" title="logo" target="_blank">
                                                            <img width="160" src="https://explorelogicsit.com/ayahuasca/assets/img/logo2(2).png" title="logo" alt="logo">
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:28px;font-family:'Rubik',sans-serif;">Retreat Booked Successfully
                                                        </h1>
                                                        <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                                            Hey! ${fullname}, you are successfully booked the Ayahuasca retreat, at price $${amountindoller} at 12-03-2023 for date 18-03-2023. <br>
                                                            <strong>
                                                                It's our plaesure you booked our retreat, we sure you really enjoy and book again in future۔
                                                            </strong>
                                                            
                                                        </p>
                                                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;">
                                                        </span><br />
                        
                                                        <h4 style="text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color: #20e277;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;">
                                                            Thank you!
                                                        </h4>
                                                        
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> Copyright &copy; <strong>Ayahuasca 2023</strong> 
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        </table>
                        `

                    }
                )
                client.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        return res.json({ msg: 'error', response: err + " " + "Email not sent." });
                    } else {
                        return res.json({ msg: 'success', response: "Email sent successfully." });
                    }
                })

            } catch (error) {
                console.log(error)
                return res.json({ status: false, msg: "Something went wrong." });
            }


        }
        res.json({ msg: "success", response: "Payment successfull", data: charge });

    } catch (error) {
        res.json({ msg: "error", response: "Error processing payment", err: error });
    }
}

// const send_email = async (req, res, next) => {
//     try {
//         const { email, name, subject, message } = req.body;
//         const client = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: "muhammadishtiaqamjad@gmail.com",
//                 pass: "xakzmshkxghpjqmt"
//             }
//         });
//         const mailOptions = (
//             {
//                 from: 'muhammadishtiaqamjad@gmail.com',
//                 to: email,
//                 subject: subject,
//                 text: "Hey, " + name + " " + message + "."
//             }
//         )
//         client.sendMail(mailOptions, function (err, info) {
//             if (err) {
//                 return res.json({ status: false, msg: err });
//             } else {
//                 return res.json({ status: true, msg: "Email sent" });
//             }
//         })
//     } catch (error) {
//         return res.json({ status: false, msg: "Something went wrong." });
//     }
// }

// const upload = async (req, res, next) => {
//     const id = req.body.userid
//     console.log(req.file)
//     await Users.findOneAndUpdate({ _id: id }, {
//         $set: {
//             'profile': req.file.filename
//         }
//     }).then((result) => {
//         return res.json({ status: true, msg: "Profile updated successfully", data: result });
//     })
// }



module.exports = {
    register,
    verify_login,
    create_charge,
    // send_email,
    // upload
}