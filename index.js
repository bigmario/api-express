const express = require('express');

const app = express();
const port = 3000;

const routerApi = require('./routes')

routerApi(app);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

