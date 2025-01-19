
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/Config/db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.status(200).json('Hello World!'));

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(`Error: ${error.message}`);
    //process.exit(1);
});
