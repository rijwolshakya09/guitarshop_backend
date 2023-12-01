const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+"/images"));

//Importing DB Connection
require('./db_connection/dbconnection');

//Importing Routes //Modules are already in routes
const customerRouter = require('./routers/customerRouter');
const adminRouter = require('./routers/adminRouter');

const guitarRouter = require('./routers/guitarRouter');
const guitarCategoryRouter = require('./routers/guitarCategoryRouter');
const wishlistRouter = require('./Routers/wishlistRouter');
const addtocartRouter = require('./Routers/addtocartRouter');
const blogRouter = require('./Routers/blogRouter');
const orderRouter = require('./Routers/orderRouter');
const reviewRouter = require('./Routers/reviewRouter');

app.use(customerRouter);
app.use(adminRouter);
app.use(guitarRouter);
app.use(guitarCategoryRouter);
app.use(wishlistRouter);
app.use(blogRouter);
app.use(addtocartRouter);
app.use(orderRouter);
app.use(reviewRouter);


app.listen(90);

module.exports = app;
