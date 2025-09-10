// require('dotenv').config();
// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const PORT = process.env.SERVER_PORT || 8080;
// const axios = require('axios');
// const cors = require('cors');
// // const routes = require("./routes/index.js");
// // const { dbConnection } = require('./config/db.js');
// // const { initSocket } = require('./socket'); // adjust path
// // const helmet = require('helmet');
// // const multer = require('multer');
// // const { startScheduler } = require("./scheduler/cronJob.js");
// // const { ConnectCloadinary } = require('./config/cloudinary.js');


// // ConnectCloadinary();


// // Setup middlewares
// // app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// if (process.env.NODE_ENV !== 'production') {
//   app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
//   });
// }













// const SHOPIFY_STORE = process.env.SHOPIFY_STORE || 'your-store.myshopify.com';
// const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || 'your-admin-access-token';

// const API_VERSION = '2025-07';
// const SHOPIFY_API = `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`;

// const shopify = axios.create({
//   baseURL: SHOPIFY_API,
//   headers: {
//     'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
//     'Content-Type': 'application/json'
//   }
// });

// app.post('/upload-product', async (req, res) => {
//   try {
//     const {
//       title,
//       variantsData,      // { color, size, price, sku }
//       colorImages,       // { Red: 'url', Blue: 'url' }
//       galleryImagesMap   // { variant_sku: [img1, img2, ..., img6] }
//     } = req.body;

//     // Step 1: Create product with variants
//     const options = [
//       { name: 'Color' },
//       { name: 'Size' }
//     ];
//     const variants = variantsData.map(v => ({
//       option1: v.color,
//       option2: v.size,
//       price: v.price,
//       sku: v.sku
//     }));

//     const productResp = await shopify.post('/products.json', {
//       product: {
//         title,
//         options,
//         variants
//       }
//     });

//     const product = productResp.data.product;
//     const productId = product.id;

//     // Step 2: Group variants by color
//     const colorGroups = {};
//     product.variants.forEach(variant => {
//       const color = variant.option1;
//       if (!colorGroups[color]) colorGroups[color] = [];
//       colorGroups[color].push(variant.id);
//     });

//     // Step 3: Upload one image per color group (bind to variant_ids)
//     for (const [color, variantIds] of Object.entries(colorGroups)) {
//       const imgUrl = colorImages[color];
//       if (!imgUrl) continue;

//       await shopify.post(`/products/${productId}/images.json`, {
//         image: {
//           src: imgUrl,
//           variant_ids: variantIds
//         }
//       });
//     }

//     // Step 4: Attach 6 gallery images per variant via metafield
//     for (const variant of product.variants) {
//       const images = galleryImagesMap[variant.sku];
//       if (!images || images.length !== 6) continue;
     

//       console.log(images.length);
//       await shopify.post(`/variants/${variant.id}/metafields.json`, {
//         metafield: {
//           namespace: 'custom',
//           key: 'gallery_images',
//           type: 'json',
//           value: JSON.stringify(images)
//         }
//       });
//     }

//     return res.status(200).json({ message: 'Product uploaded successfully', productId });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     return res.status(500).json({ error: 'Failed to upload product' });
//   }
// });








// // Routes
// // app.use("/api", routes);

// // startScheduler(); // start scheduled sync for product S&S to Shopify

// // app.use((err, req, res, next) => {
// //   if (err.code === "LIMIT_FILE_SIZE") {
// //     return res.status(400).json({ message: "File size is too large (max 10MB)" });
// //   }

// //   if (err instanceof multer.MulterError) {
// //     return res.status(400).json({ message: err.message });
// //   }

// //   return res.status(500).json({ message: err.message || "Internal Server Error" });
// // });


// // Test route
// app.use("/", (req, res) => res.send("Yes, Now you can hit APIs"));

// const startServer = async () => {
//   try {
//     // await dbConnection();
//     server.listen(PORT, () => {
//       console.log(`Server is ready to listen on port ${PORT}`);
//     });
//     //for real sync
//     // initSocket(server);
//   } catch (err) {
//     console.error(`Someting Went Wrong in Start Server, Error is  ${err}`);
//     process.exit(1);
//   }
// }

// startServer();











require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.SERVER_PORT || 8080;
const axios = require('axios');
const cors = require('cors');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// Shopify config
const SHOPIFY_STORE = process.env.SHOPIFY_STORE || 'your-store.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || 'your-admin-access-token';
const API_VERSION = '2025-07';
const SHOPIFY_API = `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}`;

const shopify = axios.create({
  baseURL: SHOPIFY_API,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
});

// Utility: delay to avoid Shopify rate limit
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Upload product with variants and images
app.post('/upload-product', async (req, res) => {
  try {
    const {
      title,
      variantsData,      // Array of { color, size, price, sku }
      colorImages,       // { Red: 'url', Blue: 'url' }
      galleryImagesMap   // { sku: [img1, ..., img6] }
    } = req.body;

    // Basic validation
    if (!variantsData || !Array.isArray(variantsData) || variantsData.length === 0) {
      return res.status(400).json({ error: 'variantsData is required and must be a non-empty array.' });
    }

    if (variantsData.length > 100) {
      return res.status(400).json({ error: 'Shopify supports up to 100 variants per product.' });
    }

    // Create product with options and variants
    const options = [
      { name: 'Color' },
      { name: 'Size' }
    ];
    const variants = variantsData.map(v => ({
      option1: v.color,
      option2: v.size,
      price: v.price,
      sku: v.sku
    }));

    const productResp = await shopify.post('/products.json', {
      product: {
        title,
        options,
        variants
      }
    });

    const product = productResp.data.product;
    const productId = product.id;

    console.log(`✅ Product created: ${productId}`);
    console.log('Shopify API Call Limit:', productResp.headers['x-shopify-shop-api-call-limit']);

    // Group variants by color
    const colorGroups = {};
    product.variants.forEach(variant => {
      const color = variant.option1;
      if (!colorGroups[color]) colorGroups[color] = [];
      colorGroups[color].push(variant.id);
    });

    // Upload color-based images
    for (const [color, variantIds] of Object.entries(colorGroups)) {
      const imgUrl = colorImages[color];
      if (!imgUrl) continue;

      await delay(500); // Rate limit protection
      await shopify.post(`/products/${productId}/images.json`, {
        image: {
          src: imgUrl,
          variant_ids: variantIds
        }
      });

      console.log(`📷 Image uploaded for color: ${color}`);
    }

    // Upload gallery images as metafields (6 per variant)
    for (const variant of product.variants) {
      const images = galleryImagesMap[variant.sku];
      if (!images || images.length !== 6) continue;

      await delay(500); // Rate limit protection
      await shopify.post(`/variants/${variant.id}/metafields.json`, {
        metafield: {
          namespace: 'custom',
          key: 'gallery_images',
          type: 'json',
          value: JSON.stringify(images)
        }
      });

      console.log(`🖼️ Gallery images attached to variant: ${variant.sku}`);
    }

    return res.status(200).json({
      message: '✅ Product uploaded successfully',
      productId
    });

  } catch (err) {
    console.error('❌ Upload failed:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to upload product' });
  }
});

// Test route
app.get("/", (req, res) => res.send("✅ Shopify API is running. Ready to accept uploads."));

// Start server
const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(`❌ Server start error: ${err}`);
    process.exit(1);
  }
}

startServer();
