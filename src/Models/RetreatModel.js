var mongoose = require('mongoose');
require("dotenv").config()

const RetreatModel = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    interested: {
        required: true,
        type: String
    },
    going: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: Boolean
    },
}, { timestamps: true })

RetreatModel.pre(
    'save', async function (next) {
        next()
    }
)
const Retreats = mongoose.model("retreats", RetreatModel);
module.exports = Retreats;