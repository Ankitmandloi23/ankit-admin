const express = require("express");
const controllers = require("../controller/WebsiteContentEdit.controller.js");
const customerValidation = require("../schema/customerValidation.js");
const router = express.Router();





router.get('/WebsiteGetContent',customerValidation.customerRegister, controllers.WebsiteGetContent);
router.post('/WebsiteSetContent',customerValidation.customerRegister, controllers.WebsiteSetContent);





// router.put("/setDiscountDetails",customerValidation.verifyToken,controllers.setDiscountDetails); //update Descount from admin side


// router.post('/admin-change-password',customerValidation.verifyToken, controllers.adminChangePassword);
// router.post('/track-anonymous-user', controllers.trackAnonymousUser)
// router.get('/get-active-user-count',customerValidation.verifyToken, controllers.getActiveUserCount)

// router.post('/tActiveUserL', controllers.trackActiveUsersWithLocation)
// router.get('/getActiveUsersWithLocation', controllers.getActiveUsersWithLocation)






// router.post('/track-location', controllers.trackLocation);
// router.get('/getTrackedLocation', controllers.getTrackedLocation);

module.exports = router;