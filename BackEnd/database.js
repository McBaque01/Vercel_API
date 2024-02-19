// const mongoose = require('mongoose');

// const connectDB = async (mongoURI) => {
//   try {
//         await mongoose.connect(mongoURI); 
//         console.log('MongoDB connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB: Database', error);
//     process.exit(1); // Exit with failure
//   }
// };


// const userSchema = new mongoose.Schema({
//     firstname: String,
//     lastname: String,
//     name: String,
//     email: String,
//     password: String,
//   });

// const User = mongoose.model('User', userSchema, 'Portfolio');

// const insertUser = async (userInput) => {
//     const {firstname, lastname, name, email, password} = userInput;

//     const newUser = new User({
//         firstname: firstname,
//         lastname: lastname,
//         name: name,
//         email: email,
//         password: password,
//       });

//     try {
//         await newUser.save();
//         console.log('User created successfully:', newUser);
//         return newUser; // Return the newly created user
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error; // Throw the error to be handled by the calling function
//     }

// }

// exports.insertUser = insertUser;
// exports.connectDB = connectDB;



const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://vercel-admin-user:hBojOvCZeapjKL4j@cluster0.npib522.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectDatabase() {
    try {
        await client.connect();
        db = client.db("Portfolio");
        await db.command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Propagate the error to the caller
    }
}
function getDatabase() {
    if (!db) {
        throw new Error('Database is not connected');
    }
    return db;
}

async function closeDatabase() {
    try {
        await client.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error; // Propagate the error to the caller
    }
}

async function insertUser(userData) {
    const db = client.db("Portfolio");
    const users = db.collection('Users');
    
    try {
        const result = await users.insertOne(userData);
        console.log('Inserted document:', result.insertedId);
        return result; // Return the inserted user document
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = {
    connectDatabase,
    getDatabase,
    closeDatabase,
    insertUser
};