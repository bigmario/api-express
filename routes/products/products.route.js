const express = require('express')

const ProductsService = require('../../services/products/product.service')

const router = express.Router();

router.get('/', async (req, res) => {
  const productsService = await ProductsService.getInstance();
  const { query } = req;
    products = await productsService.findAll(query)
    res.json(products);
});

router.get('/:id', async (req, res) => {
  const productsService = await ProductsService.getInstance();
  const { id } = req.params;
  const product = await productsService.findOne(id)
  if(!product) {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.status(200).json(product);
  }

});

router.patch('/:id', async (req, res) => {
  try {
    const productsService = await ProductsService.getInstance();
    const { id } = req.params;
    const body = req.body;
    const product = await productsService.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  const productsService = await ProductsService.getInstance();
  const { id } = req.params;
  const deletedProduct = await productsService.delete(id)

  if (!deletedProduct) {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.json(deletedProduct);
  }
});

router.post('/', async (req, res) => {
  const productsService = await ProductsService.getInstance();
  const body = req.body;
  const newProduct = await productsService.create(body)
  res.status(201).json(newProduct);
});

module.exports = router;
