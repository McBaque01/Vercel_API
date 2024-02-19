const express = require('express') // nodejs framework

const app = express();
const port = 8080;
app.use(express.json());

app.post('/signup', async (req, res) => {
    console.log("VERCEL API");
    console.log("Hi there");
    const { firstname, lastname, name, email, password } = req.body;
    const newuser = { firstname, lastname, name, email, password };
    try {
        // const result = await Users.insertOne(newuser);
        // console.log('Inserted document:', result.insertedId);
        res.status(200).json({ response: { message: 'User created successfully', input: {...newuser} } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
console.log(`Server is running on ${port}`);
});

module.exports = app;