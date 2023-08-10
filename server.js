const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // This line ensures the file extension is included
    }
});

const upload = multer({ storage: storage });
const dataFile = 'data.json';

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
    const name = req.body.name;
    const text = req.body.text;
    const image1Path = req.files['image1'][0].path;
    const image2Path = req.files['image2'][0].path;

    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    data.push({ name, text, image1Path, image2Path });
    fs.writeFileSync(dataFile, JSON.stringify(data));

    res.send({ success: true });
});

app.get('/gallery', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    res.send(data);
});

app.use('/uploads', express.static('uploads'));

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]');
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
