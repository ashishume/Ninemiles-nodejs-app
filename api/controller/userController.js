const UserModel = require('../models/user');
const mongoose = require('mongoose');

// 1 ==> Teacher
// 2 ==> General Student
// 4 ==> Academic Student
exports.user_controller = (req, res, next) => {
    UserModel.find({ email: req.body.email, status: 1 }, { status: 0, __v: 0, createdAt: 0, paymentStatus: 0 })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(200).json({
                    message: 'Email exists',
                    registrationStatus: 1,
                    userDetails: user[0]
                });
            } else {


                const present_date = new Date();
                const user = new UserModel({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    profileImageUrl: req.body.profileImageUrl,
                    mobile: req.body.mobile,
                    userType: "Student",
                    status: 1,
                    paymentStatus: 0,
                    createdAt: present_date
                });
                user
                    .save()
                    .then(result => {
                        return res.status(200).json({
                            message: 'User created',
                            userDetails: result[0],
                            registrationStatus: 0
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: err
                        });
                    });
            } //catch end
        }).catch(err => {
            return res.status(500).json({
                error: err
            });
        });
    //catch end
}


exports.get_user_details = (req, res, next) => {
    UserModel.find({ status: 1 }, { status: 0, __v: 0 })
        .exec()
        .then(docs => {
            if (docs.length > 0) return res.status(200).json(docs);
            else
                return res.status(204).json({
                    message: 'No entries Found',
                });
        })
        .catch(error => {
            res.status(500).json({
                error: err
            });
        });
}

exports.get_user_by_email = (req, res, next) => {
    // var userId = mongoose.Types.ObjectId(req.query.userId);

    UserModel.find({ email: req.query.email, status: 1 }, { status: 0, __v: 0, createdAt: 0 })
        .then(docs => {

            const response = {
                userDetails: docs[0]
            };
            if (docs.length > 0) res.status(200).json(response.userDetails);
            else
                res.status(204).json({
                    message: 'No entries Found'
                });
        })
        .catch(error => {
            return res.status(500).json({
                error: err
            });
        });
}
exports.get_user_by_id = (req, res, next) => {
    var userId = mongoose.Types.ObjectId(req.query.userId);

    UserModel.find({ _id: userId, status: 1 }, { __v: 0, createdAt: 0 })
        .then(docs => {
            if (docs.length > 0) res.status(200).json(docs);
            else
                res.status(204).json({
                    message: 'No entries Found'
                });
        })
        .catch(error => {
            return res.status(500).json({
                error: err
            });
        });
}

exports.delete_user_by_email = (req, res, next) => {
    // var userId = mongoose.Types.ObjectId(req.query.userId);
    UserModel.findOneAndUpdate(
        { email: req.query.email },
        { status: 0 },
        { new: true }
    )
        .then(doc => {
            if (!doc) {
                res.status(500).json({
                    message: 'User Does not exist',
                    error: err
                });
            } else {
                res.status(200).json({
                    message: 'User Deleted'
                });
            }
        })
        .catch(e => {
            res.status(400).send();
        });
}
exports.set_payment_status = (req, res, next) => {
    UserModel.findOneAndUpdate(
        { email: req.body.email, status: 1 },
        { paymentStatus: req.body.paymentStatus },
        { new: true }
    )
        .then(doc => {
            if (!doc) {
                res.status(500).json({
                    message: 'User Does not exist',
                    error: err
                });
            } else {
                res.status(200).json({
                    message: 'Payment Status Updated'
                });
            }
        })
        .catch(e => {
            res.status(400).send();
        });
}
exports.update_user_type = (req, res, next) => {
    UserModel.findOneAndUpdate(
        { email: req.body.email, status: 1 },
        { userType: req.body.userType },
        { new: true }
    )
        .then(doc => {
            if (!doc) {
                res.status(500).json({
                    message: 'User Does not exist',
                    error: err
                });
            } else {
                res.status(200).json({
                    message: 'User Type Updated'
                });
            }
        })
        .catch(e => {
            res.status(400).send();
        });
}