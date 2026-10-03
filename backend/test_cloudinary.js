require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testUpload() {
  try {
    console.log('Testing Cloudinary Connection...');
    const result = await cloudinary.search
      .expression('folder:stella_shipping')
      .max_results(1)
      .execute();
    console.log('Success! Connected to Cloudinary.');
  } catch (err) {
    console.error('Error connecting to Cloudinary:', err.message);
  }
}

testUpload();
