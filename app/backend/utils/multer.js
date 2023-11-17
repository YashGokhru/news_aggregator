const multer = require('multer');
const path  = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the folder where you want to store uploaded images
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Use the current timestamp as the filename to avoid overwriting
    }
});

const upload = multer({ storage: storage });

module.exports = upload;