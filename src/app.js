const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db/conn')
const router = require('./routers/services');

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000', credentials: true, exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'], allowedHeaders: ['Content-Type', 'Authorization', 'multipart/form-data']}));
app.use(cors());

// to ensure server connects to database before its live
connectToMongoDB()
    .then(() => {

        app.use(router)

        app.get('/', async (req, res) => {
            res.status(200).send("Server is live!")
        })

        app.listen(port, () => {
            console.log(`Server is live at port no. ${port}`);
        })
    })
