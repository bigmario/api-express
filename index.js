const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const productList = [];
const index = 0;
for (let index = 0; index <= 10; index++) {
  productList.push({
    id: index,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    img: faker.image.imageUrl()
  });
}

app.get('/', (req, res) => {
  res.send("Hola");
});

app.get('/new-route', (req, res) => {
  res.json({
    message: 'Hola',
    status: res.statusCode
  });
})

app.get('/products', (req, res) => {
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

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const item = productList.findIndex((product) => product.id === parseInt(id))
  res.json(productList[item]);
});

app.post('/products/', (req, res) => {
  productList.push(req.body);

  res.json(productList);
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

