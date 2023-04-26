var mongoose = require('mongoose');
require("dotenv").config()

const BookingModel = new mongoose.Schema({
    retreat_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'retreats'
    },
    fullname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    trx_id: {
        required: true,
        type: String
    },
    payment: {
        required: true,
        type: String
    },
    payment_status: {
        required: true,
        type: String
    },
    booking_date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean
    },
}, { timestamps: true })

BookingModel.pre(
    'save', async function (next) {
        next()
    }
)
const Bookings = mongoose.model("bookings", BookingModel);
module.exports = Bookings;