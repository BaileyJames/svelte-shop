const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require("cors");
const server = '127.0.0.1:27017';
const database = 'AlmarSample';
const app = express()

// mongoose.connect(`mongodb://${server}/${database}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }).then(() => {
//     console.log('MongoDB connected!!');
// }).catch(err => {
//     console.log('Failed to connect to MongoDB', err);
// });


async function connect() {
    const MongoClient = require("mongodb").MongoClient;
        const uri = `mongodb://${server}/${database}`;
        const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await mClient.connect()
        
        console.log("connected to database")
        const db = mClient.db("AlmarSample")
        const col = db.collection("sample")

        
        app.get("/api/db", (req, res) => {
    
            (async function() {
                //console.log(await col.find().sort({_id: -1}).toArray())
                res.send(await col.find().sort({_id: -1}).toArray())
            })()
            
        });
        app.get("/api/db/search", (req, res) => {
            (async function() {
                const products = await col.find({"product": {'$regex': req.query.product}}).toArray()
                res.send(products)
            })()
        });
        app.get("/api/db/:product", (req, res) => {
            (async function() {
                console.log(req.params.product)
        
                    let myName = req.params.product
                    let newName = myName.slice(1)
                    let firstLetter = myName.charAt(0).toUpperCase()
                    newName = firstLetter + newName
        
                    console.log(newName)
                    const product = await col.find({"product": newName}).sort({_id:-1}).toArray()
                    res.send(product)
            })()
        })
        
}
connect()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));





// app.post("/api/db", (req, res) => {
    
//     async function run() {

//         try {
//             const MongoClient = require("mongodb").MongoClient;
//             const uri = `mongodb://${server}/${database}`;
//             const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//             await mClient.connect()
            
//             console.log("connected")
//             const db = mClient.db("AlmarSample")
//             const col = db.collection("sample")
//             console.log(req.body)
//             col.insertOne(req.body)

//         } finally {
//             //await mClient.close()
//         }
//      }
//     res.send(req.body)
//     console.log(req.body)
//     run()
// })

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(4000, () => {
    console.log("app on 4000")
})
