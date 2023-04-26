const express = require('express')
const router = express.Router();
const AdminAuthController = require('../src/Controllers/AdminAuthController');
const RetreatController = require('../src/Controllers/RetreatController');
const BookingController = require('../src/Controllers/BookingController');
const { check } = require('express-validator');

router.post('/admin_verify_login', AdminAuthController.verify_login);
router.post('/register', AdminAuthController.register);

// router.put('/upload_profile', upload.single("profile"), UserController.upload)


//route for store
router.post("/add_retreat", [
    check('title').not().isEmpty().withMessage('Title is required<br />'),
    check('description').not().isEmpty().withMessage('Description is required<br />'),
    check('interested').not().isEmpty().withMessage('Interested is required <br />'),
    check('going').not().isEmpty().withMessage( 'Going is required <br />'),
], RetreatController.store_retreat);

//route get retreats
router.get("/get_retreats", RetreatController.getretreats);
//get_retreat
router.post("/get_retreat/:id", RetreatController.getretreat);
//update-retreat
router.put("/update_retreat",RetreatController.updateretreat)
//route delete retreat
router.delete("/delete_retreat/:id", RetreatController.delete_retreat);
//route creata charge
router.post("/payment/create_charge", BookingController.create_charge);
//route get retreat bookings
router.post("/retreatbooking/:retreat_id", BookingController.get_retreat_booking);
module.exports = router;