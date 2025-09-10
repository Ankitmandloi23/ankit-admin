
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constant/messages.js");
const { statusCode } = require("../constant/statusCodes.js");
const { WebsiteContent } = require("../model/WebsiteContentSchema.js");



// Get content by section (for frontend site)
exports.WebsiteGetContent = async (req, res) => {
  const content = await WebsiteContent.findOne({ section: req.params.section });
  return sendResponse(res, statusCode.OK, false, SuccessMessage.CONTENT_FETCHED, content);

};


// Update or create content (for admin panel)
exports.WebsiteSetContent = async (req, res) => {
  const { title, description, points } = req.body;
  let content = await WebsiteContent.findOne({ section: req.params.section });

  if (!content) {
    content = new WebsiteContent({ section: req.params.section, title, description, points });
  } else {
    content.title = title;
    content.description = description;
    content.points = points;
    content.updatedAt = new Date();
  }

  await content.save();
  return sendResponse(res, statusCode.OK, true, SuccessMessage.CONTENT_UPDATED, content);
}





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

