const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
        await mongoose.connect(mongoURI); 
        console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB: Database', error);
    process.exit(1); // Exit with failure
  }
};


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    name: String,
    email: String,
    password: String,
  });

const User = mongoose.model('User', userSchema, 'Portfolio');

const insertUser = async (userInput) => {
    const {firstname, lastname, name, email, password} = userInput;

    const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        name: name,
        email: email,
        password: password,
      });

    try {
        await newUser.save();
        console.log('User created successfully:', newUser);
        return newUser; // Return the newly created user
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Throw the error to be handled by the calling function
    }

}

exports.insertUser = insertUser;
exports.connectDB = connectDB;