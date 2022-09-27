const {sequelize} = require('./controller.js')

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;

        CREATE TABLE categories (
            category_id serial PRIMARY KEY,
            name varchar(80)
        );

        CREATE TABLE products (
            product_id serial PRIMARY KEY,
            name varchar(80),
            category_id  integer REFERENCES categories(category_id),
            price DECIMAL(5, 2)
        );

        INSERT INTO categories (name)
        VALUES ('Stickers'),
            ('Art Prints'),
            ('Dice');

        INSERT INTO products (name, category_id, price)
        VALUES ('Vinyl Sticker x1', 1, 3.00),
            ('Vinyl Sticker x2', 1, 5.00),
            ('Vinyl Sticker x3', 1, 7.50),
            ('Waterproof Sticker x1', 1, 2.50),
            ('Waterproof Sticker x2', 1, 4.00),
            ('Waterproof Sticker x3', 1, 6.50),
            ('Rainbow Dice Set', 3, 50.00),
            ('Bone Dice Set', 3, 65.00),
            ('Solo D20', 3, 12.00),
            ('Ghibli Print', 2, 10.00),
            ('Bookmark Print', 2, 7.50)
        `)
    }
}