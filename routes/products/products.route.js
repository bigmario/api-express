const express = require('express')
const { faker } = require('@faker-js/faker');

const router = express.Router();

const productList = [];
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
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = productList.findIndex((product) => product.id === parseInt(id))
  res.json(productList[item]);
})

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
})

module.exports = router;
