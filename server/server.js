const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// MODULE IMPORTS
const {
    getProducts,
    getCategories,
    addCategory,
    addProduct,
    deleteCategory,
    deleteProduct
} = require('./controller.js');
const {seed} = require('./seed.js');

// ENDPOINTS
app.post('/seed', seed)
app.get('/products/:id', getProducts);
app.get('/categories', getCategories);
app.post('/new-category', addCategory);
app.post('/new-product', addProduct);
app.delete('/delete-category/:categoryID', deleteCategory);
app.delete('/delete-product/:id', deleteProduct);

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});