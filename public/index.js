const baseURL = `https://spectral-seedlings-inventory.herokuapp.com/products` || `http://localhost:4005/products`;

const categoryList = document.querySelector("#category-list");
const productBox = document.querySelector("#product-box");
const newCategoryBtn = document.querySelector("#new-category");
const newProductBtn = document.querySelector("#new-product");

makeProductCard = (product) => {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}</p>
        <button class="delete-product" onclick="deleteProduct(${product.product_id})">delete</button>
    `
    productBox.appendChild(productCard)
};

showProducts = (req, res) => {
    const body = {
        category: categoryList.textContent
    }
    axios.get(baseURL, body)
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            makeProductCard(res.data[i])
        }
    })
};

showCategories = (req, res) => {

};

makeCategory = (req, res) => {

};

makeProduct = (req, res) => {

};

deleteCategory = (req, res) => {

};

deleteProduct = (req, res) => {

};

showCategories()
showProducts()