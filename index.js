const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use((req,res,next)=>{
    console.log('We got a new request');
    console.log(req);
    res.header("Access-Control-Allow-Origin", "http://localhost:3001/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

app.post('/products/add/', bodyParser.json(),async (req,res)=>{
  //console.log('REQUEST ==> ::',req);
  console.log('req.body.name',req.body);
  const product = new Product(req.body);
  await product.save();
  //console.log('NEW PRODUCT ::',product);
  res.send('NEW PRODUCT ADDED !!!');
});

app.put('/products/:id/edit',bodyParser.json(),async (req,res)=>{
    console.log('request :: ',req.params.id);
    console.log('body :: ',req.body.name);
    const updateProduct={
      name : req.body.name,
      price : req.body.price,
      category : req.body.category
    };
    const  id  = req.params.id;
    const product = await Product.findByIdAndUpdate(id,updateProduct,{runValidators:true});
    res.send('Product updated !!');
});


app.post('/products/:id/delete',bodyParser.json(),async (req,res)=>{
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log('name of Deleted product :: ',deletedProduct);
    res.send('Product Deleted !!');
});


app.get('/products',bodyParser.json(),async (req,res)=>{
    //console.log('REQUEST ==> ::',req);
    const products = await Product.find({});
    console.log(products);
    res.send(products);
});

app.listen(port,()=>{
    console.log(`App listening on port : ${port}`);
});


main().then(()=>console.log('connected to mongo-db successfully'))
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
}
