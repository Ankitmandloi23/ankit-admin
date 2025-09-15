const services = require("../services/auth.service.js");
const bcrypt = require('bcrypt');
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constant/messages.js");
const { statusCode } = require("../constant/statusCodes.js");
const User = require("../model/userSchema.js");
const ActiveUser = require('../model/activeUserSchema.js');
const { dbConnection } = require("../config/db.js");
const Location = require('../model/locationSchema.js')
const jwt = require('jsonwebtoken');

// const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
// const crypto = require('crypto');
// const client = require('../utils/redisClient.js');

exports.signUp = async (req, res) => {
  try {

    const userName = req.body.userName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const role = req.body.role;


    //console.log("userName",userName);
    //console.log("email",email);
    //console.log("phoneNumber",phoneNumber);
    //console.log("password",password);
    //console.log("role",role);

    const result = await services.signUp(userName, email, phoneNumber, password, role);
    if (!result) {
      //console.log(result, "INTERNAL_SERVER_ERROR")
      return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.USER_ALREADY_EXIST);
    }
    return sendResponse(res, statusCode.OK, true, SuccessMessage.SIGNUP_SUCCESS, result);
  } catch (error) {
    //console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};







//oTP logic
// const OTP_TTL_SECONDS = 5 * 60; // 5 minutes
// const TEMP_TOKEN_TTL_SECONDS = 10 * 60; // 10 minutes

// const otpStore = new Map();

// function generateOtp() {
//   // 6-digit numeric
//   return ('' + Math.floor(100000 + Math.random() * 900000));
// }

// function hashOtp(otp) {
//   return crypto.createHash('sha256').update(otp).digest('hex');
// }


exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await services.findUserForLogin(email);

    if (!user) {
      return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.USER_NOT_FOUND);
    }

    if (user.role !== role) {
      return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.NOT_AUTHORIZED);
    }


    const loginResult = await services.passwordCompareForLogin(user, password);
    if (!loginResult) {
      return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.WRONG_EMAIL_OR_PASSWORD);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN_SUCCESS, loginResult);

    // 2) Generate & send OTP
    // const otp = generateOtp();
    // console.log("otp", otp)
    // const record = {
    //   hash: hashOtp(otp),
    //   expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
    //   attempts: 0,
    // };
    // otpStore.set(email, record);
    // const send = await services.sendEmailForOtpverification(email, otp);
    // if (!send) {
    //   return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, "Error in email send For OTP");
    // }

    // // 3) Create a short-lived temp token (only for OTP verification)
    // const tempToken = jwt.sign(
    //   { email, purpose: 'otp', role, exp: Math.floor(Date.now() / 1000) + TEMP_TOKEN_TTL_SECONDS },
    //   SECRET_KEY
    // );

    // // 4) Tell client to go to OTP page
    // return res.status(200).json({
    //   success: true,
    //   message: 'Password accepted. OTP sent to email.',
    //   result: { requiresOtp: true, tempToken, email }
    // });

  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, `${error.message}`);
  }
};



// exports.verifyOtp = async (req, res) => {
//   try {
//     const auth = req.headers.authorization || '';
//     const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
//     if (!token) return res.status(401).json({ success: false, message: 'No temp token' });

//     // verify temp token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, SECRET_KEY);
//     } catch {
//       return res.status(403).json({ success: false, message: 'Invalid or expired session. Please login again.' });
//     }
//     if (decoded.purpose !== 'otp') {
//       return res.status(403).json({ success: false, message: 'Invalid token purpose' });
//     }

//     const { email: emailFromToken, role } = decoded;
//     const { email, otp } = req.body;
//     if (!email || !otp || email !== emailFromToken) {
//       return res.status(400).json({ success: false, message: 'Invalid request' });
//     }

//     const record = otpStore.get(email);
//     if (!record) return res.status(400).json({ success: false, message: 'No OTP pending for this email' });
//     if (Date.now() > record.expiresAt) {
//       otpStore.delete(email);
//       return res.status(400).json({ success: false, message: 'OTP expired. Please login again.' });
//     }
//     if (record.attempts >= 5) {
//       otpStore.delete(email);
//       return res.status(429).json({ success: false, message: 'Too many attempts. Please login again.' });
//     }

//     record.attempts += 1;
//     if (hashOtp(otp) !== record.hash) {
//       return res.status(401).json({ success: false, message: 'Incorrect OTP' });
//     }

//     // OTP is correct -> clean up and issue real app token
//     otpStore.delete(email);

//     const user = await services.findUserForLogin(email); // or include user id/role in temp token
//     const appTokenPayload = { id: user._id, email: user.email, role: role || user.role, tokenVersion: user.tokenVersion };
//     const appToken = jwt.sign(appTokenPayload, SECRET_KEY, { expiresIn: '7d' });

//     return res.status(200).json({
//       success: true,
//       message: 'OTP verified',
//       result: { token: appToken }
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };


// exports.resendOtp = async (req, res) => {
//   try {
//     const auth = req.headers.authorization || '';
//     const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
//     if (!token) return res.status(401).json({ success: false, message: 'No temp token' });
//     console.log("token",token)

//     let decoded;
//     try {
//       decoded = jwt.verify(token, SECRET_KEY);
//     } catch {
//       return res.status(403).json({ success: false, message: 'Invalid or expired session.' });
//     }
//     console.log("decoded",decoded)

//     if (decoded.purpose !== 'otp') return res.status(403).json({ success: false, message: 'Invalid token purpose' });
//      console.log("valid")
//     const { email } = req.body;
//     if (!email || email !== decoded.email) return res.status(400).json({ success: false, message: 'Invalid request' });
//   console.log("email",email)
//     const otp = generateOtp();
//     otpStore.set(email, {
//       hash: hashOtp(otp),
//       expiresAt: Date.now() + OTP_TTL_SECONDS * 1000,
//       attempts: 0,
//     });
    
//     const send = await services.sendEmailForOtpverification(email, otp);
//     if (!send) {
//       return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, "Error in email send For OTP");
//     }

//     // Optional: rotate temp token on resend
//     const newTemp = jwt.sign(
//       { email, purpose: 'otp', role: decoded.role, exp: Math.floor(Date.now() / 1000) + TEMP_TOKEN_TTL_SECONDS },
//       SECRET_KEY
//     );

//     return res.status(200).json({
//       success: true,
//       message: 'OTP resent',
//       result: { tempToken: newTemp }
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };


// exports.logoutAll = async (req, res) => {
//   try {
//     await services.incrementTokenVersion(req.user.id);
//     return res.json({ success: true, message: 'Logged out from all devices.' });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// };


exports.validate = async (req, res) => {
    return res.status(200).json({ success: true, message: 'Token is valid' });
};


exports.adminChangePassword = async (req, res) => {
  try {

    const { email, oldPassword, newPassword } = req.body;

    // Fetch the user
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.ADMIN_NOT_FOUND, email);

    // Ensure the user is the admin
    if (user.role !== 'admin') {
      return sendResponse(res, statusCode.FORBIDDEN, false, ErrorMessage.ONLY_ADMIN_CAN_CHANGE_PASSWORD, email);
    }

    // Validate current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.WRONG_EMAIL_OR_PASSWORD, email);

    // Prevent reusing the same password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.NEWPASSWORD_SAME_AS_OLD, email);

    // Hash and update the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await user.save();

    return sendResponse(res, statusCode.OK, true, SuccessMessage.PASSWORD_CHANGED_SUCCESSFULLY, email);
  } catch (error) {
    console.error('Admin change password error:', error);
    return false;
  }
};





//Using Pay (Redis ex- Upstash)
// exports.trackAnonymousUser = async (req, res) => {
//   console.log("trackAnonymousUser CALLED1");
//   try {
//     const { anonId } = req.body;
//     if (!anonId) return res.status(400).json({ message: 'anonId required' });
//     console.log("anonId", anonId)
//     await client.set(`activeUser:${anonId}`, 'true', { EX: 300 }); // expires in 5 minutes
//     res.status(200).json({ message: 'Activity tracked' });
//   } catch (err) {
//     console.error('Activity Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


//Using Pay (Redis ex- Upstash)
// exports.getActiveUserCount = async (req, res) => {
//     console.log("getActiveUserCount called1");
//   try {
//     const keys = await client.keys('activeUser:*');
//     res.status(200).json({ activeUserCount: keys.length });
//   } catch (err) {
//     console.error('Count Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// exports.trackAnonymousUser = async (req, res) => {
//   console.log("trackAnonymousUser CALLED2");
//   try {
//     await dbConnection();
//     const { anonId } = req.body;
//     if (!anonId) return res.status(400).json({ message: 'anonId required' });

//     console.log(`Tracking ping from anonId: ${anonId} at ${new Date().toISOString()}`);

//     await ActiveUser.findOneAndUpdate(
//       { anonId },
//       { lastActive: new Date() },
//       { upsert: true }
//     );

//     res.status(200).json({ message: 'Activity tracked' });
//   } catch (err) {
//     console.error('Activity Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.trackActiveUsersWithLocation = async (req, res) => {
  try {
    await dbConnection();
    const { anonId, location } = req.body;

    if (!anonId) {
      return res.status(400).json({ message: 'anonId required' });
    }

    const update = { lastActive: new Date() };

    if (location) {
      update.location = {
        city: location.city,
        country: location.country,
        region: location.region,
        lat: location.lat,
        lon: location.lon,
        ip: location.ip,
        timestamp: new Date()
      };
    }

    await ActiveUser.findOneAndUpdate(
      { anonId },
      update,
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'successfully' });
  } catch (err) {
    console.error('UserT error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




// exports.getActiveUserCount = async (req, res) => {
//   console.log("getActiveUserCount called2");
//   try {
//     const cutoff = new Date(Date.now() - 5 * 60 * 1000); // last 5 min
//     const activeUsersData = await ActiveUser.countDocuments({ lastActive: { $gte: cutoff } });
//     res.status(200).json({ activeUserCount: activeUsersData });
//   } catch (err) {
//     console.error('Count Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports.getActiveUsersWithLocation = async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 5 * 60 * 1000); // 5 min active window
    const users = await ActiveUser.find({ lastActive: { $gte: cutoff } })
      .sort({ lastActive: -1 })
      .lean();  // lean for plain JS objects

    res.status(200).json({
      activeUserCount: users.length,
      users
    });

  } catch (err) {
    console.error('getActiveUsersWithL error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



//track Location API 

// exports.trackLocation = async (req, res) => {
//   console.log("trackLocation CALLED function");
//   try {
//     const { city, country, region, lat, lon, ip } = req.body;
//     await Location.create({ city, country, region, lat, lon, ip });
//     res.status(200).json({ message: 'Location saved' });
//   } catch (err) {
//     console.error('trackLocation Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



exports.getTrackedLocation = async (req, res) => {
  console.log("getTrackedLocation CALLED function");
  try {
    const locations = await Location.find().sort({ timestamp: -1 });
    res.status(200).json(locations);
  } catch (err) {
    console.error('tragetTrackedLocation Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




//////////////////////////login



function signSession(payload, ttlSeconds = 30 * 60) {
  return jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: ttlSeconds });
}

function verifySession(token) {
  return jwt.verify(token, process.env.SESSION_SECRET);
}

//login to shopify
exports.logintest = async (req, res) => {

  console.log("Login Called")
  const { email, password } = req.body;
  console.log("email Called", email)
  console.log("password Called", password)
  try {
    const resp = await fetch(`https://${process.env.SHOPIFY_STORE_URL}.myshopify.com/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_KEY
      },
      body: JSON.stringify({
        query: `
          mutation($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken { accessToken expiresAt }
              userErrors { field message }
            }
          }`,
        variables: { input: { email, password } }
      })
    });
    // console.log("resp",resp)
    const data = await resp.json();
    // console.log("data",data)
    const result = data?.data?.customerAccessTokenCreate;
    const accessToken = result?.customerAccessToken?.accessToken;
    const errorMsg = result?.userErrors?.[0]?.message;

    if (!accessToken) {
      return res.status(401).send(`Login failed${errorMsg ? ': ' + errorMsg : ''}`);
    }

    // Option A (simple): store ONLY a session with a flag & no PII
    const appJwt = signSession({
      typ: 'design_sess', // mark type
      st: accessToken // store token to use server-side to fetch customer info when needed
    });

    res.cookie('design_sess', appJwt, {
      httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 30 * 60 * 1000
    });

    return res.status(200).send('Login success');
    // return res.redirect(302, next || '/design');
  } catch (e) {
    return res.status(500).send(e.message);
  }

};

//details of user get from shopif 
exports.meTest = async (req, res) => {
  console.log("dddd")
  const token = req.cookies['design_sess'];
  if (!token) return res.status(401).json({ ok: false });

  try {
    const payload = verifySession(token);
    const storefrontToken = payload.st;
    // Call Storefront API to fetch customer info with the token
    const resp = await fetch(`https://${process.env.SHOPIFY_STORE_URL}.myshopify.com/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_KEY,
        'X-Shopify-Customer-Access-Token': storefrontToken
      },
      body: JSON.stringify({
        query: `
          query {
            customer {
              id
              email
              firstName
              lastName
            }
          }`
      })
    });
    const data = await resp.json();
    const customer = data?.data?.customer;
    if (!customer) return res.status(401).json({ ok: false });
    return res.json({ ok: true, customer });
  } catch (e) {
    return res.status(401).json({ ok: false, message: e.message });
  }

};


//signup
exports.signUpTest = async (req, res) => {
  const { email, password, firstName, lastName, next } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password are required' });
  }

  try {
    // 1) Create the customer (Storefront API)
    const createResp = await fetch(`https://${process.env.SHOPIFY_STORE_URL}.myshopify.com/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_KEY
      },
      body: JSON.stringify({
        query: `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer { id email }
              userErrors { field message }
            }
          }
        `,
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
            acceptsMarketing: false
          }
        }
      })
    });

    const createJson = await createResp.json();
    const cResult = createJson?.data?.customerCreate;
    const cErrors = cResult?.userErrors || [];
    const createdCustomer = cResult?.customer;

    if (!createdCustomer) {
      return res.status(400).json({
        ok: false,
        error: cErrors[0]?.message || 'Could not create customer',
        details: cErrors
      });
    }

    // ⚠️ If your store requires email confirmation, you might NOT want to auto-login here.
    // For most stores, you can auto-login:

    const tokenResp = await fetch(`https://${process.env.SHOPIFY_STORE_URL}.myshopify.com/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_API_KEY
      },
      body: JSON.stringify({
        query: `
          mutation login($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken { accessToken expiresAt }
              userErrors { field message }
            }
          }
        `,
        variables: { input: { email, password } }
      })
    });

    const tokenJson = await tokenResp.json();
    const tResult = tokenJson?.data?.customerAccessTokenCreate;
    const accessToken = tResult?.customerAccessToken?.accessToken;
    const tErrors = tResult?.userErrors || [];

    if (!accessToken) {
      // Account created but cannot login (e.g., requires email confirmation)
      return res.status(201).json({
        ok: true,
        created: true,
        needsVerification: true,
        message: tErrors[0]?.message || 'Account created. Please check your email to activate before logging in.'
      });
    }

    // 3) Issue your own short-lived app session (JWT in HttpOnly cookie)
    const appJwt = signSession({ typ: 'design_sess', st: accessToken }); // keep payload minimal
    res.cookie('design_sess', appJwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 60 * 1000
    });

    return res.status(201).json({
      ok: true,
      created: true,
      loggedIn: true,
      // redirect: next || '/design'
    });
  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ ok: false, error: 'Signup error' });
  }

};

exports.logoutTest = async (req, res) => {
  res.clearCookie('design_sess', { path: '/' });
  res.json({ ok: true });
};


