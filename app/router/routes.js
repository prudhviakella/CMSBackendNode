module.exports = function(app) {
    var employee = require("../controller/controller.js");
    let upload = require("../config/multer.config.js");
    //app.post("/api/file/upload", upload.single("file"), aarav.uploadFile);
    // Create a new Customer
    app.post("/api/register", employee.create);
    app.post("/api/signin", employee.signin);
    app.post("/api/userprofile", employee.getuserprofile);
    app.post("/api/saveskills", employee.saveskills);
};