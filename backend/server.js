const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const server = '127.0.0.1:27017';
const database = 'AlmarSample';

(async () => {
	const app = express();
	app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
	
    const MongoClient = require("mongodb").MongoClient;
    const uri = `mongodb://${server}/${database}`;
    const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mClient.connect();

    console.log("connected to database");
    const db = mClient.db("AlmarSample");
    const col = db.collection("sample");

    app.get("/api/db", async (req, res) => {
        res.send(await col.find().sort({_id: -1}).toArray());   
    });
    
    app.get("/api/db/search", async (req, res) => {
        const products = await col.find({"product": {'$regex': req.query.product}}).toArray();
        res.send(products);
    });
	
    app.get("/api/db/:product", async (req, res) => {
        console.log(req.params.product);

        let myName = req.params.product;
        let newName = myName.slice(1);
        let firstLetter = myName.charAt(0).toUpperCase();
        newName = firstLetter + newName;

        console.log(newName);
        const product = await col.find({"product": newName}).sort({_id:-1}).toArray();
        res.send(product);
    });
    
    app.get("/", (req, res) => {
        res.send("Hello");
    });
    app.post("/api/db", async (req, res) => {

        //This checks to see if the id of the product submitted already exists, and
        //if it does, it will (when i've finished it) do a patch request to edit
        //the product, and if it doesn't exist, it will make a new product.
        
        //col.insertOne(req.body)

        let productIdInt = parseInt(req.body._id)

        let myArr = (await col.find({_id: productIdInt}).toArray())

        
        if(myArr != "") {
            if (myArr[0]._id == productIdInt){
                res.send("HEI2I")
                
            }
        }
        else {res.send("cant find")}

    })
    app.listen(4000, () => {
        console.log("Listening on 4000");
    });
        
})();
