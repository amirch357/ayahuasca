const { validationResult } = require('express-validator');
const RetreatModel = require('../Models/RetreatModel');
const ObjectId = require("mongodb").ObjectId;

const store_retreat = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ msg: 'val_error', response: errors.array() });
    } else {
        try {
            const { title, description, interested, going } = req.body;
            const RetreatData = {
                'title': title,
                'description': description,
                'interested': interested,
                'going': going,
                'status': true
            }
            const resp_retreat = new RetreatModel(RetreatData);
            resp_retreat.save().then(() => {
                return res.json({ msg: 'success', response: "Retreat stored successfully." });
            }).catch((error) => {
                return res.json({ msg: 'error', response: error });
            });
        } catch (error) {
            return res.json({ msg: 'error', response: "Something went wrong." });
        }
    }
}

const getretreats = async (req, res, next) => {
    RetreatModel.find().then((result) => {
        return res.status(200).json({ allretreats: result });
    })
}

const getretreat = async (req, res, next) => {
    const id = req.params.id;
    RetreatModel.findOne({ _id: id }).then((result) => {
        return res.json({ msg: 'success', response: result });
    })
}

const updateretreat = async (req, res, next) => {
    console.log("here")
    const id = new ObjectId(req.body.id)
     RetreatModel.findOneAndUpdate({ _id: id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            interested: req.body.interested,
            going: req.body.going,
            status: true
        }
    }).then((result) => {
        return res.status(200).json({ msg: "success", response: "Updated Successfully"});
    })
}

const delete_retreat = async (req, res, next) => {
    const proId = req.params.id
    const id = new ObjectId(proId)
    RetreatModel.findByIdAndDelete({ _id: id }).then((result) => {
        if (result) {
            return res.json({ msg: 'success', response: "Successfully deleted!" });
        } else {
            return res.json({ msg: 'error', response: "Something went wrong." });
        }
    })
}

module.exports = {
    store_retreat,
    getretreats,
    getretreat,
    updateretreat,
    delete_retreat,
}