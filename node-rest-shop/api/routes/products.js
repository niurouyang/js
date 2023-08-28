const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose  = require('mongoose');

router.get('/',(req,res,next) =>{
Product.find()
/*
Product.find is a Mongoose query that returns a promise.
In JavaScript, a promise is an object that represents a value that might be available now, or in the future, or possibly never. Promises are used to handle asynchronous operations, such as making network requests, reading files, or querying databases, where the result is not immediately available.

When a function returns a promise, it means that the function will perform an asynchronous operation and eventually resolve with a value or reject with an error. This allows you to handle the result of the asynchronous operation using .then() and .catch() methods, respectively.
*/
    .exec()
    .then(docs => {//docs is the query that Product.find() returned value, in this case, because there is no query inside find(), it will return all the product.
        console.log(docs);
        if (docs.length >= 0){
            res.status(200).json(docs);
        } else{
            res.status(404).json({
                message:'No item found'
            });
        }
        res.status(200).json(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}); 


router.post('/',(req,res,next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name:req.body.name,
        price: req.body.price
    });
        product
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: 'Handling POST requests to /products',
                createdProduct: product
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log('From database',doc);
        if (doc) {
            res.status(200).json(doc);
        } else{
            res.status(404).json({message:'No valid entry found'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.patch('/:productId',(req,res,next) =>{
    const id= req.params.productId;
    const updateOps={};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    /*
    [
        {
            "propName" : "name",
            "value" :"Harry Botter"
        }
    ]
    This will change the name of the book, if you want to change the price of the book.
    [
        {
            "propName" : "price",
            "value" :"14.99"
        }
    ]   
    */
    Product.update({_id:id},{$set:updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({result})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).josn({
            error:err
        });
    });
});

router.delete('/:productId',(req,res,next) =>{
    const id=req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);    
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
});


module.exports = router;
