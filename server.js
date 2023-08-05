
import { setWallpaper } from 'wallpaper'
import { createRequire } from "module";
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);

const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

const express = require('express')
const app = express()
const port = 3000


const fs = require('fs');

const publicDirectoryPath = path.join(__dirname, 'windows');
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile('index.html', { root: publicDirectoryPath });
});

app.get('/set-wallpaper/:base64imageURL', (req, res) => {

    let base64Image = decodeURIComponent(req.params.base64imageURL);

    fs.writeFile('image.png', base64Image, { encoding: 'base64' }, function (err) {
        setWallpaper('image.png', {
            scale: 'fill'
        });
    });
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})