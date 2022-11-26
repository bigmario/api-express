const express = require('express');
const routerApi = require('./routes')

const { logErrors, errorhandler, boomErrorhandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json())

routerApi(app);

app.use(logErrors)
app.use(boomErrorhandler)
app.use(errorhandler)

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});


