const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/getuser', async (req, res) => {
    let success = false;
    if (!req.body.name) {
        return res.status(400).json({ success: success, message: "Name of user not given" });
    }

    if (!req.body.ID) {
        return res.status(400).json({ success: success, message: "ID of user not given" });
    }
    try {
        let user = await User.findOne({ name: req.body.name, ID: req.body.ID })
        if (!user) {
            return res.status(404).json({ message: "User Not Found", success: success });
        }
        else {
            success = true;
            return res.json({ user, success });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success });
    }
})

router.post('/createuser', async (req, res) => {
    let success = false;
    if (!req.body.name) {
        return res.status(400).json({ success: success, message: "Name of user not given" });
    }

    if (!req.body.userID) {
        return res.status(400).json({ success: success, message: "ID of user not given" });
    }
    if (!req.body.roomID) {
        return res.status(400).json({ success: success, message: "Room ID of user not given" });
    }
    if (!req.body.noOfDays) {
        return res.status(400).json({ success: success, message: "Number of days of user not given" });
    }
    try {
        let user = await User.findOne({ userID: req.body.userID })
        if (user) {
            return res.status(400).json({ message: "User with ID already Present", success: success });
        }
        else {
            user = await User.create({
                name: req.body.name,
                userID: req.body.userID,
                noOfDays:req.body.noOfDays,
                roomID:req.body.roomID,
            })
            success = true;
            return res.json({ user, success });
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({ success });
    }
})

router.get('/getallusers', async (req, res) => {
    let success = false;
    //validation
    let allUsers = [];
    try {

        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).json({ success: success, message: "Internal Server Error" });
            }
            users.map(user => {
                allUsers.push(user);
            })
            success = true;
            return res.json({ success, allUsers });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: success, message: "Internal Server Error" });
    }

})

// router.post('/updateuser', async (req, res) => {
//     let success = false;
//     if (!req.body.name) {
//         return res.status(400).json({ success: success, message: "Name of user not given" });
//     }

//     if (!req.body.ID) {
//         return res.status(400).json({ success: success, message: "ID of user not given" });
//     }
//     try {
//         let user = await User.findOne({ ID: req.body.ID });
//         if (!user) {
//             return res.status(400).jsonreturn({ message: "User Not Found", success: success });
//         }
//         else {

//             success = true;
//             return res.json({ user, success });
//         }
//     } catch {
//         return res.status(500).json({ success });
//     }
// })

router.delete('/deleteuser', async (req, res) => {
    let success = false;
    if (!req.body.name) {
        return res.status(400).json({ success: success, message: "Name of user not given" });
    }

    if (!req.body.ID) {
        return res.status(400).json({ success: success, message: "ID of user not given" });
    }
    try {
        let user = await User.deleteOne({ ID: req.body.ID, name: req.body.name });
        if (!user) {
            return res.status(400).json({ message: "User Not Found", success: success });
        }
        else {
            success = true;
            return res.json({ message: "note deleted successfully", success: success });
        }
    } catch {
        return res.status(500).json({ success });
    }
})

module.exports = router;