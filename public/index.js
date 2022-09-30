// BASE URL
const baseURL = /*`https://spectral-seedlings-inventory.herokuapp.com/` ||*/ `http://localhost:4005/`;

// DOM VARIABLES
const categoryList = document.querySelector("#categories-list");
let currentCategory = categoryList.value;
const productList = document.querySelector("#product-list");
let categoryName = document.querySelector("#category-name");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const newCategoryBtn = document.querySelector("#new-category");
const newProductBtn = document.querySelector("#new-product");
const deleteCategoryBtn = document.querySelector("#delete-category");

// FUNCTIONS
categoryOnChange = (e) => {
    currentCategory = categoryList.value;
    showProducts(currentCategory)
};

clearCategories = () => {
    let defaultCategory = document.createElement("option")
    defaultCategory.value = "Categories..."
    defaultCategory.textContent = "Categories..."
    categoryList.replaceChildren(defaultCategory)
};

clearProducts = () => {
    productList.replaceChildren()
};

showCategories = (req, res) => {
    clearCategories()
    axios.get(`${baseURL}categories`)
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            let category = res.data[i]
            let newCategory = document.createElement("option")
            newCategory.value = category.category_id
            newCategory.classList.add("category")
            newCategory.textContent = category.name + ''
            categoryList.appendChild(newCategory)
        }
    })
    currentCategory = categoryList.value
    showProducts(currentCategory)
};

makeProductCard = (product) => {
    const productCard = document.createElement("li");
    productCard.value = `${product.name}`
    productCard.classList.add("product")
    productCard.innerHTML = `
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}</p>
        <button class="delete-product" onclick="deleteProduct(${product.product_id})">delete</button>
    `
    productList.appendChild(productCard)
};

showProducts = (categoryID) => {
    clearProducts()
    if(currentCategory === "Categories..."){
        return
    }
    else {
        axios.get(`${baseURL}products/${categoryID}`)
        .then(res => {
            for(let i = 0; i < res.data.length; i++){
                makeProductCard(res.data[i])
            }
        })
    }
};

makeCategory = (req, res) => {
        if(categoryName.textContent === "" || " "){
            alert("Please give your new Category a name")
        }
        else {
        let bodyObj = {
            name: categoryName.textContent
        }
        axios.post(`${baseURL}new-category`, bodyObj)
        .then(res => {
            alert(`${categoryName.textContent} added to Categories`);
            categoryName.textContent = '';
            showCategories();
        })
    }
};

makeProduct = (req, res) => {
    if(productName.textContent === "" || " "){
        alert("Please give your new Product a name")
    }
    else if(productPrice.textContent === "" || " "){
        alert("Please give your new Product a price")
    }
    else {
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
            showProducts(currentCategory);
        })
    }
};

deleteCategory = (req, res) => {
    if(currentCategory === "Categories..."){
        alert("Please select a Category to remove")
    }
    else {
        let confirmDelete = `This will delete the current Category and all Products in it.\nAre you sure?`
        return Promise.resolve().then(() => {
            if (confirm(confirmDelete) === true){
                axios.delete(`${baseURL}delete-category/${currentCategory}`)
                .then(res => {
                    alert(`Category deleted`);
                    clearCategories();
                    showCategories();
                })
            }
        });
        
    }
};

deleteProduct = (id) => {
    let confirmDelete = "Are you sure you want to delete this product?"
    if (confirm(confirmDelete) === true){
        axios.delete(`${baseURL}delete-product/${id}`)
        .then(res => {
            alert("Product deleted")
            showProducts(currentCategory);
        })
    }
};

// EVENT LISTENERS
categoryList.addEventListener("change", categoryOnChange)
newCategoryBtn.addEventListener("click", makeCategory)
// newProductBtn.addEventListener("click", makeProduct)
deleteCategoryBtn.addEventListener("click", deleteCategory)


// ONSTART
showCategories()