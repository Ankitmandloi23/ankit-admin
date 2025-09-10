// models/WebsiteContent.js
const mongoose  = require("mongoose");

const WebsiteContentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., "about", "hero"
  title: String,
  description: String,
  points: [String],
  updatedAt: { type: Date, default: Date.now },
});

const WebsiteContent = mongoose.model("WebsiteContentSchema", WebsiteContentSchema);
module.exports = WebsiteContent;