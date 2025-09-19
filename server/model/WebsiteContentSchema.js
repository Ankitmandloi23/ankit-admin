// models/WebsiteContent.js
const mongoose = require("mongoose");

const WebsiteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. "heroTitle"
  value: { type: String, required: true }
});

const WebsiteContent = mongoose.model("WebsiteContentSchema", WebsiteContentSchema);
module.exports = WebsiteContent;