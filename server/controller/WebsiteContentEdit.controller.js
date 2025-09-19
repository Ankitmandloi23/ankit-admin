
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constant/messages.js");
const { statusCode } = require("../constant/statusCodes.js");
const WebsiteContent = require("../model/WebsiteContentSchema.js");



// Get content by section (for frontend site)
exports.WebsiteGetContent = async (req, res) => {
  const content = await WebsiteContent.find();
  return sendResponse(res, statusCode.OK, false, SuccessMessage.CONTENT_FETCHED, content);

};


// Update or create content (for admin panel)
exports.WebsiteSetContent = async (req, res) => {
  const updates = req.body;

  
    await WebsiteContent.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );
  

  // Return plain array so frontend can use .find
  const content = await WebsiteContent.find({});
  res.json(content);
};







// exports.login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await services.findUserForLogin(email);

//     if (!user) {
//       return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.USER_NOT_FOUND);
//     }

//     if (user.role !== role) {
//       return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.NOT_AUTHORIZED);
//     }


//     const loginResult = await services.passwordCompareForLogin(user, password);

//     if (!loginResult) {
//       return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.WRONG_EMAIL_OR_PASSWORD);
//     }

//     return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN_SUCCESS, loginResult);

//   } catch (error) {
//     return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
//   }
// };

