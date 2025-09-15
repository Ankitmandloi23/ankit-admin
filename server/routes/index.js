const express = require("express");
const WebsiteContentEditRoutes = require("./WebsiteContentEdit.routes.js");
const authRoutes = require("./auth.routes.js");
const router = express.Router();




router.use("/WebsiteContentEditRoutes", WebsiteContentEditRoutes);
router.use("/authRoutes", authRoutes);



module.exports = router;