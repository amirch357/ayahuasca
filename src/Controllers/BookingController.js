const Bookings = require('../Models/BookingModel');
const Stripe = require('stripe')("sk_test_51LgbR6LNnAduS9ocDFC4x4hwzw8TTSInXFppl7Yb8NfBnTrI7rjifgOu8InBOU13zi3SEXP8klNeEVUEbBiXTLVa00NHSrmYn7");
const nodemailer = require('nodemailer');
const ObjectId = require("mongodb").ObjectId;
const moment = require('moment');


const create_charge = async (req, res, next) => {
    try {
        const { retreat_id, retreat_title, totalAmount, token, fullname, email, phone, bookfordate, description } = req.body;
        const charge = await Stripe.charges.create({
            currency: 'usd',
            amount: totalAmount,
            description: description,
            source: token.id,
        });
        var amountindoller = (totalAmount / 100);
        
        if (charge.status === "succeeded") {
           
                const bookings = await  Bookings.create({
                    retreat_id: retreat_id,
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    trx_id: charge.id,
                    payment: totalAmount,
                    payment_status: 'success',
                    booking_date: bookfordate
                });
            
           
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
                        html: `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:470px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
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
                                        Hey! ${fullname}, you are successfully booked the Ayahuasca retreat (<strong style="text-decoration:none !important; display:inline-block; font-weight:600; color: #9807ac;text-transform:capitalize; font-size:14px;padding:0px 6px;display:inline-block;">${retreat_title}</strong> ), at price $${amountindoller} on ${moment(Date()).format("ddd, MMM DD YYYY")} for date ${  moment(bookfordate).format("ddd, MMM DD YYYY")}. <br>
                                            <strong>
                                                It's our plaesure you booked our retreat, we sure you really enjoy and book again in future۔
                                            </strong>
                                    </p>
                                    <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;">
                                    </span><br />
                                    <h4 style="text-decoration:none !important; display:inline-block; font-weight:600; margin-top:24px; color: #00662e;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;">
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
                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> Copyright &copy; 
                        <strong>
                        <a href="http://localhost:3000/" title="Ayahuasca" target="_blank" style="color: rgba(69,80,86,0.7411764705882353);text-decoration: none !important;">Ayahuasca</a> ${new Date().getFullYear()}</strong>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
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

const get_retreat_booking = async (req, res, next) => {
    const id = req.params.retreat_id;
    Bookings.find({ retreat_id: id }).then((result) => {
        return res.json({ msg: 'success', response: result });
    })
}

module.exports = {
    create_charge,
    get_retreat_booking,
}