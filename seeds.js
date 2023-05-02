const mongoose = require('mongoose');
const Products = require('./models/products.js');
const { insertMany } = require('./models/products');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
}

main().then(()=>console.log('connected to mongo-db successfully'))
      .catch(err => console.log(err));


const seedProducts = [
    {
        name : 'Fairy Eggplant',
        price : 1.00,
        category : 'vegetable'
    },
    {
        name : 'Organic Goddess Melon',
        price : 4.99 ,
        category : 'fruit'
    },
    {
        name : 'Organic Mini Seedless Melon',
        price : 3.99,
        category : 'fruit'
    },
    {
        name : 'Organic Celery',
        price : 1.50,
        category : 'vegetable'
    }
];      


Products.insertMany(seedProducts)
        .then(res=>console.log('Data inserted successfully !!' , res))
        .catch(err=>console.log(err));
