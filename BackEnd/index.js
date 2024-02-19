const express = require('express') // nodejs framework
const { connectDB, insertUser }= require('./database.js');

const app = express();
const port = 8080;
app.use(express.json());

const MongoDB_URI = "mongodb+srv://vercel-admin-user:hBojOvCZeapjKL4j@cluster0.npib522.mongodb.net/?retryWrites=true&w=majority";

connectDB(MongoDB_URI);

app.post('/signup', async (req, res) => {
    console.log("VERCEL API");
    console.log("Hi there");
    const { firstname, lastname, name, email, password } = req.body;
    const newuser = { firstname, lastname, name, email, password};
    try {
        const createdUser = await insertUser(newuser);
        res.status(200).json({ response: { message: 'User created successfully', user: createdUser } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
console.log(`Server is running on ${port}`);
});

module.exports = app;