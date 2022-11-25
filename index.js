const express = require('express');

const app = express();
const port = 3000;

const routerApi = require('./routes')
app.use(express.json())

routerApi(app);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

