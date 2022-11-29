const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const whitelist = ['http://localhost:5500', 'http://127.0.0.1:5500'];

const corsOptions = {
  origin: (origin, callback) => {
    whitelist.includes(origin) || !origin ? callback(null, true) : callback(new Error('Forbidden'))
  },
  optionsSuccessStatus: 200
}

const { logErrors, errorhandler, boomErrorhandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors(corsOptions));

routerApi(app);

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorhandler)
app.use(errorhandler)



app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});


