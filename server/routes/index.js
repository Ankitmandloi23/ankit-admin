const express = require("express");
const {WebsiteGetContent, WebsiteSetContent} = require("../controller/WebsiteContentEdit.controller.js");
const router = express.Router();

router.use("/WebsiteSetContent", WebsiteSetContent);
router.use("/WebsiteGetContent", WebsiteGetContent);




module.exports = router;