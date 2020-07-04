const express = require('express');
var router = express.Router();
// var index = require('./index.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://anhquan:anhquan@cluster0.l9q6m.gcp.mongodb.net/test';

router.get('/', async (req,res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDb");
    let results = await dbo.collection("products").find().toArray();
    res.render('index', {products:results});
})

router.post('/search', async (req, res)=>
{
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDb");
    var nameValue = "";
    if (req.body.search != null && req.body.search != ""){
        nameValue = req.body.search
        var searchProduct = {name : nameValue};
        console.log("___________________")
        console.log(searchProduct)
    }
    let results = await dbo.collection("products").find(searchProduct).toArray();
    res.render('index', {products:results});
})

router.get('/insert',(req,res)=>{
    res.render('insertProduct');
})

router.post('/insert',async (req,res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDb");
    let nameValue = req.body.txtName;
    let priceValue = req.body.txtPrice;
    if (nameValue != null && priceValue != null) {
        console.log("INSERT")
    let newProduct = {name : nameValue, price : priceValue};
    await dbo.collection("products").insertOne(newProduct);
    }
    let results = await dbo.collection("products").find({}).toArray();
    res.redirect('/');
})

router.get('/doSearch', (req, res)=>
{
    res.render();
})

module.exports = router;