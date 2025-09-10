const express = require("express");

const WebsiteContentEdit = require("../controller/WebsiteContentEdit.controller.js");

const router = express.Router();

router.use("/WebsiteContentEdit", WebsiteContentEdit);




module.exports = router;