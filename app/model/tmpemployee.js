var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TmpEmployeeSchema = new Schema({
    tmpid: String,
    jobtitle: String,
    name: String,
    Email: String,
    phoneext: String,
    phonenumber: String,
    currentcompany: String,
    currentdesgination: String,
    Adharnumber: String,
    creationdate: Date,
    currentstatus: String,
    interviewstage: [new Schema({
        PannelName: String,
        Pannelmembers: Array,
        Feedback: [new Schema({
            membername: String,
            Feedback: String,
            submitteddate: Date
        })]
    })],
    onboardingstage: new Schema({
        tracking: [new Schema({
            information: String,
            date: Date
        })]
    }),
    Joined: Boolean
});
module.exports = TmpEmployeeSchema