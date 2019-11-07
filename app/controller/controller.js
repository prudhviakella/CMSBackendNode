var mongoose = require("mongoose");
var uniqid = require('uniqid');
const Bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var EmployeeSchema = require("../model/employee");
var TmpEmployeeSchema = require("../model/tmpemployee");
var error_info = require("./error");
var uri =
    "mongodb+srv://abylle:abylle@cluster0-db3tv.mongodb.net/EmployeeManagement?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
var employee_info_model = mongoose.model("employee_main", EmployeeSchema);
var tmpemployee_model = mongoose.model("tmpemployee", TmpEmployeeSchema);

exports.create = async function(req, res) {
    try {
        employee_info_model.findOne({ employeeid: req.body.employeeid }, async function(err, obj) {
            if (err) {
                res.status(400).json({
                    message: "Error while finding employee doc: Function:Employee Create",
                    error: err,
                    error_info: error_info.errors[0]
                });
            }
            if (obj == null) {
                var user = await employee_info_model.findOne({ username: req.body.username }).exec();
                if (!user) {
                    req.body.password = Bcrypt.hashSync(req.body.password, 10);
                    var employee_info = new employee_info_model(req.body);
                    employee_info.save(function(error) {
                        if (error) {
                            res.status(400).json({
                                message: "Error while saving employee information",
                                error: error,
                                error_info: error_info.errors[0]
                            });
                        }
                        res.status(200).json({
                            message: "Employee created successfully"
                        });
                    });
                } else {
                    res.status(400).json({
                        message: "Email address already taken",
                        error_info: error_info.errors[2]
                    });
                }
            } else {
                res.status(400).json({
                    message: "Employee already exist with employee id",
                    error_info: error_info.errors[1]
                });
            }
        });
    } catch (error) {

    }
};

exports.signin = async function(req, res) {
    try {
        var user = await employee_info_model.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(400).send({ message: "The username does not exist", error_info: error_info.errors[3] });
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid", error_info: error_info.errors[4] });
        }
        var token = jwt.sign({ userID: user.employee_id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
        console.log(token)
        res.status(200).json({
            employee_id: user.employee_id,
            username: user.username,
            token: token
        });
    } catch (error) {
        return res.status(400).send({ message: "some error while signin", error: error, error_info: error_info.errors[0] });
    }
};

exports.getuserprofile = async function(req, res) {
    try {
        var user = await employee_info_model.findOne({ employeeid: req.body.employeeid }).exec();
        if (!user) {
            return res.status(400).send({ error_info: error_info.errors[5] });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({ message: "some error fetching user profile", error: error, error_info: error_info.errors[0] });
    }
};

exports.saveskills = async function(req, res) {
    try {
        employee_info_model.findOneAndUpdate({ employeeid: req.body.employeeid }, { $set: { skills: req.body.skills } }, { safe: true, upsert: true },
            function(err, model) {
                if (err) {
                    return res.status(400).send({ error: err, error_info: error_info.errors[6] });
                }
                return res.status(200).send({ message: "skills updated successfully" });
            }
        )
    } catch (error) {
        return res.status(400).send({ message: "some error while updating skills", error: error, error_info: error_info.errors[0] });
    }

    exports.createtmpemp = async function(req, res) {
        try {

        } catch (error) {
            return res.status(400).send({ message: "some error while updating skills", error: error, error_info: error_info.errors[0] });
        }
    }
};