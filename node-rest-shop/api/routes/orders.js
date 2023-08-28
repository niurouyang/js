const express = require('express');
//const { routes } = require('../../app');
const router = express.Router();
const morgan = require('morgan');

//handel get request
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Order were fetched'
    });
});

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity:req.body.quantity
    };
    res.status(200).json({
        message:'Order were created',
        order: order
    });
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Order details',
        orderId:req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Order del ete',
        orderId:req.params.orderId
    });
});

module.exports = router;