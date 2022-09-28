require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    sequelize,
    getProducts: (req, res) => {
        const {id} = req.params
        sequelize.query(`
            SELECT * FROM products WHERE category_id = ${id}
            ORDER BY name asc;
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },
    getCategories: (req, res) => {
        sequelize.query(`
            SELECT * FROM categories
            ORDER BY name asc;
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },
    addCategory: (req, res) => {
        const {name} = req.body
        sequelize.query(`
            INSERT INTO categories (name)
            VALUES (${name})
        `).then(res.status(200))
        .catch(err => console.log(err))
    },
    addProduct: (req, res) => {
        const {name, category, price} = req.body
        const categoryID = sequelize.query(`SELECT category_id FROM categories WHERE name = ${category};`)
        sequelize.query(`
            INSERT INTO products (name, category_id, price)
            VALUES (${name}, ${categoryID}, ${price});
        `).then(res.status(200))
        .catch(err => console.log(err))
    },
    deleteCategory: (req, res) => {
        const {category} = req.body
        const categoryID = sequelize.query(`SELECT category_id FROM categories WHERE name = ${category};`)
        sequelize.query(`DELETE FROM products WHERE category_id = ${categoryID};`)
        sequelize.query(`DELETE FROM categories WHERE category_id = ${categoryID};`)
        .then(res.status(200))
        .catch(err => console.log(err))
    }
}