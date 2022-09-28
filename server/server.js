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
    deleteCategory
} = require('./controller.js');

// ENDPOINTS
app.get('/products', getProducts);
app.get('/products', getCategories);
app.post('/new-category', addCategory);
app.post('/new-product', addProduct);
app.delete('/delete-category', deleteCategory);

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});