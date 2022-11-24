const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express()

// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://<username>:<password>@cluster0.lnoy20s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }

    finally {

    }
}

run().catch(err => console.error(err))




app.get('/', async (req, res) => {
    res.send('products resale server running')
})

app.listen(port, () => console.log(`products resale server running on ${port}`))