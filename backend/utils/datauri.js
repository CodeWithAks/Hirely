import DataUriParser from "datauri/parser.js";
import path from "path"

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extname = path.extname(file.originalname).toString();
    return parser.format(extname,file.buffer);
}

export default getDataUri;

// Jab user photo upload karega, wo buffer (binary data) ke form mein aata hai.
// Cloudinary ko URL-like format chahiye hota hai → "data:image/png;base64,...."

// So:
// file.buffer = photo ka raw data
// file.originalname = photo ka naam, jisse extension (jpg/png) nikalti hai
// DataUriParser() = binary ko URL format mein convert karta hai

// 👉 Ye function photo ko aise format mein convert karta hai jisme Cloudinary accept kare.