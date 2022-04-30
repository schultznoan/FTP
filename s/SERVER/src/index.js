const express = require('express');
const server = express();
const cart = require('./components/cart');
const contact = require('./components/contact');
const readJSON = require('../plugins/readJSON');
const writeJSON = require('../plugins/writeJSON');

server.listen(3000);
server.use('/', express.json());

const catalogURL = './src/db/catalog.json';
const cartURL = './src/db/cart.json';
const menuURL = './src/db/menu.json';
const descriptionURL = './src/db/descriptionCatalog.json';
const contactURL = './src/db/contact.json';
const shippingMethods = "./src/db/shippingMethods.json";

//GET REQUEST
server.get('/catalog', async (req, res) => {
    const { id } = req.query;

    try {
        const data = await readJSON(catalogURL);

        if (id) {
            const findItem = data.find(item => item.id === id);
            res.json(findItem);
            return;
        };

        res.json(data);
    } catch (err) {
        console.log(`Error: + ${err}`);
    };
});

server.get('/description', async (req, res) => {
    try {
        const data = await readJSON(descriptionURL);
        res.json(data);
    } catch (err) {
        console.log(`Error: + ${err}`);
    };
});

server.get('/cart', async (req, res) => {
    try {
        const data = await readJSON(cartURL);
        res.json(data);
    } catch (err) {
        console.log(`Error: + ${err}`);
    };
});

server.get('/menu', async (req, res) => {
    try {
        const data = await readJSON(menuURL);
        res.json(data);
    } catch (err) {
        console.log(`Error: + ${err}`);
    };
});

server.get('/shipping', async (req, res) => {
    try {
        const data = await readJSON(shippingMethods);
        console.log(data)
        res.json(data);
    } catch (err) {
        console.log(`Error: + ${err}`);
    };
});

//POST REQUEST
server.post('/cart', async (req, res) => {
    const newItem = req.body;

    try {
        const data = await readJSON(cartURL);
        cart.addItem(data, newItem);
        await writeJSON(cartURL, data);
        res.json({ error: false });
    } catch (err) {
        res.json({ error: true });
        console.log(err)
    }
});

server.post('/contact', async (req, res) => {
    const form = req.body;

    try {
        const data = await readJSON(contactURL);
        contact.addItem(data, form);
        await writeJSON(contactURL, data);
        res.json({ error: false });
    } catch (err) {
        res.json({ error: true });
        console.warn(err);
    };
});

//PUT REQUEST
<<<<<<< HEAD:PROJECT/SERVER/src/index.js
server.put('/cart', async (req, res) => {
    const { id } = req.query;
    const { amount } = req.body;

    try {
        const data = await readJSON(cartURL);
        cart.changeItem(data, { amount, id });
=======
server.put('/cart/:id', async(req, res) => {
    const putItem = req.params;
    const { value, price } = req.body;

    try {
        const data = await readJSON(cartURL);
        cart.changeItem(data, { value, price, id: putItem.id });
>>>>>>> 2b1d14553068f4033c6fbfebdf72db20f790364b:s/SERVER/src/index.js
        await writeJSON(cartURL, data);
        res.json({ error: false });
    } catch (err) {
        res.json({ error: true });
        console.warn(err);
    };
})

//DELETE REQUEST
server.delete('/cart', async (req, res) => {
    const { clearCart, id } = req.query;
    console.log(clearCart, id)

    try {
        const data = await readJSON(cartURL);
        if (clearCart) {
            cart.clearCart(data);
        } else {
            cart.deleteItem(data, id);
        };
        await writeJSON(cartURL, data);
        res.json({ error: false });
    } catch (err) {
        res.json({ error: true });
        console.warn(err);
    };
});