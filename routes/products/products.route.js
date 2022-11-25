const express = require('express')
const { faker } = require('@faker-js/faker');

const router = express.Router();

let productList = [];
const index = 0;
for (let index = 1; index <= 5; index++) {
  productList.push({
    id: index,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    img: faker.image.imageUrl()
  });
}

router.get('/', (req, res) => {
  const {limit, offset} = req.query;
  const count = productList.length;
  const pages = Math.ceil(count/limit);
  const currentPage = Math.ceil(count%offset);

  res.json({
    data: (limit && offset) ? productList.slice((offset - 1) * limit , (limit * offset)) : productList,
    meta: {
      total: count,
      showing: parseInt(limit),
      page: currentPage,
      pages: pages,
    }
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = productList.findIndex((product) => product.id === parseInt(id))
  res.json(productList[item]);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  for (const product of productList) {
    if(product.id === parseInt(id)) {
      body.name ? product.name = body.name : null;
      body.price ? product.price = body.price: null;
      body.img ? product.img = body.img: null;
      break;
    }
  }

  res.json({
    message: 'Updated',
    data: body
  });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = productList.find((item) => item.id === parseInt(id))
  productList = productList.filter((item) => item.id !== parseInt(id));

  res.json({
    message: 'Deleted',
    data: deletedProduct
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const last = Math.max(...productList.map(item => item.id),1)
  productList.push({
    id: last + 1 ,
    ...body
  })
  res.json({
    message: 'created',
    data: {
      id: last + 1 ,
      ...body
    }
  });
});

module.exports = router;
