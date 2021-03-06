const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app.js');
const tourrouter = require('./Routes/tourRoute.js');
const DB = process.env.DATABASE;
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log('Connected');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started');
});
