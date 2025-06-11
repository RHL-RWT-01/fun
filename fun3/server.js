import express from 'express'
import path from 'path'

const app = express();
const port = 3000;

app.use(express.json());

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("Home page accessed");
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})