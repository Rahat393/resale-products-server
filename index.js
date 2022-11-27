const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express()

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lnoy20s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesCollection = client.db('productsResale').collection('sevices')
        const bookingsCollection = client.db('productsResale').collection('bookings')
        const usersCollection = client.db('productsResale').collection('users')

        app.get('/services', async (req, res) => {
            const query = {};
            const services = await servicesCollection.find(query).toArray();
            res.send(services)
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await servicesCollection.findOne(query);
            res.send(services);
        });

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;

            // const decodedEmail = req.decoded.email;

            // if (email !== decodedEmail) {
            //     return res.status(403).send({ message: 'forbidden access' });
            // }

            const query = { email: email };
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.put('/users/admin/:id', async (req, res) => {
            // const decodedEmail = req.decoded.email;
            // const query = { email: decodedEmail }
            // const user = await usersCollection.findOne(query);

            // if (user?.role !== 'admin') {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }

            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users)
        })

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query)
            // if (user) {
            //     const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
            //     return res.send({ accessToken: token })
            // }
            console.log(user);
            res.status(403).send({ acccessToken: '' })
        })
    }

    finally {

    }
}

run().catch(err => console.error(err))




app.get('/', async (req, res) => {
    res.send('products resale server running')
})

app.listen(port, () => console.log(`products resale server running on ${port}`))