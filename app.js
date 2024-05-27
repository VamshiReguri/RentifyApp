const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const users = [];
const properties = [];

// User Routes
app.post("/users/register", (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const user = { id: users.length + 1, firstName, lastName, email, password, phoneNumber, role: "buyer" };
    users.push(user);
    res.status(201).json(user);
});

app.post("/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Property Routes
app.post("/properties/post", (req, res) => {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;
    const property = { id: properties.length + 1, place, area, bedrooms, bathrooms, nearby, ownerId: req.body.ownerId };
    properties.push(property);
    res.status(201).json(property);
});

app.get("/properties", (req, res) => {
    res.status(200).json(properties);
});

app.get("/properties/owner/:ownerId", (req, res) => {
    const ownerId = parseInt(req.params.ownerId);
    const ownerProperties = properties.filter((property) => property.ownerId === ownerId);
    res.status(200).json(ownerProperties);
});

app.listen(port, () => {
    console.log(`Rentify app listening at http://localhost:${port}`);
});
