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
    getProducts: (req, res) => {
        const {category} = req.body
        const categoryID = sequelize.query(`SELECT category_id FROM categories WHERE name = ${category};`)
        sequelize.query(`
            SELECT * FROM products WHERE category_id = ${categoryID};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }
}