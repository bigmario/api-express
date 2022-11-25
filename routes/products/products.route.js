const express = require('express')

const ProductsService = require('../../services/products/product.service')

const router = express.Router();

const prodServ = new ProductsService()

router.get('/', (req, res) => {
  const { query } = req;
    products = prodServ.findAll(query)
    res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = prodServ.findOne(id)
  if(!product) {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.status(200).json(product);
  }

});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const product = prodServ.update(id, body);

  if (!product) {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.status(200).json(product);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = prodServ.delete(id)

  if (!deletedProduct) {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.json(deletedProduct);
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = prodServ.create(body)
  res.status(201).json(newProduct);
});

module.exports = router;
