const express = require('express')

const ProductsService = require('../../services/products/product.service')

const router = express.Router();

router.get('/', async (req, res) => {
  const productsService = await ProductsService.getInstance();
  const { query } = req;
  products = await productsService.findAll(query)
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const productsService = await ProductsService.getInstance();
    const { id } = req.params;
    const product = await productsService.findOne(id)
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const productsService = await ProductsService.getInstance();
    const { id } = req.params;
    const body = req.body;
    const product = await productsService.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productsService = await ProductsService.getInstance();
    const { id } = req.params;
    const deletedProduct = await productsService.delete(id)
    res.json(deletedProduct);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const productsService = await ProductsService.getInstance();
    const body = req.body;
    const newProduct = await productsService.create(body)
    res.status(201).json(newProduct);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
