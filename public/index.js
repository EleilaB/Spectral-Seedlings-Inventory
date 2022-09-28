const baseURL = /*`https://spectral-seedlings-inventory.herokuapp.com/` ||*/ `http://localhost:4005/`;

const categoryList = document.querySelector("#categories-list");
const productBox = document.querySelector("#product-box");
const productList = document.querySelector("#product-list");
const categoryName = document.querySelector("#category-name");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const newCategoryBtn = document.querySelector("#new-category");
const newProductBtn = document.querySelector("#new-product");

makeProductCard = (product) => {
    const productCard = document.createElement("li");
    const bodyObj = {
        name: product.name
    }
    productCard.value = `${product.name}`
    productCard.innerHTML = `
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}</p>
        <button class="delete-product" onclick="deleteProduct(${bodyObj})">delete</button>
    `
    productList.appendChild(productCard)
};

showProducts = (categoryID) => {
    axios.get(`${baseURL}products/${categoryID}`)
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            makeProductCard(res.data[i])
        }
    })
};

showCategories = (req, res) => {
    axios.get(`${baseURL}categories`)
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            let category = res.data[i]
            let newCategory = document.createElement("option")
            newCategory.value = category.category_id
            newCategory.textContent = category.name + ''
            categoryList.appendChild(newCategory)
        }
    })
};

makeCategory = (req, res) => {
    let bodyObj = {
        name: categoryName.textContent
    }
    axios.post(`${baseURL}new-category`, bodyObj)
    .then(res => {
        alert(`${categoryName.textContent} added to Categories`);
        categoryName.textContent = '';
        showCategories();
        showProducts();
    })
};

makeProduct = (req, res) => {
    let bodyObj = {
        name: productName.textContent,
        category: currentCategory,
        price: productPrice.textContent
    }
    axios.post(`${baseURL}new-product`, bodyObj)
    .then(res => {
        alert(`${productName.textContent} added in the ${currentCategory} Category`);
        productName.textContent = '';
        productPrice.textContent = '';
        showProducts();
    })
};

deleteCategory = (req, res) => {
    const bodyObj = {
        category: categoryList.value
    }
    axios.delete(`${baseURL}delete-category`, bodyObj)
    .then(res => {
        alert(`${categoryList.value} deleted`);
        showCategories();
        showProducts();
    })
};

deleteProduct = (req, res) => {
    const {name} = req.body
    const bodyObj = {
        name: name
    }
    axios.delete(`${baseURL}delete-product`, bodyObj)
    .then(res => {
        alert(`${name} deleted`);
        showProducts();
    })
};
// WTF is going on with this one? How to get name of 'anonymous' element?

showCategories()
showProducts(1)
// Find a way to make showProducts use the value of the currently selected category