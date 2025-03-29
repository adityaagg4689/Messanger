const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    message: String
});

const User = mongoose.model("User", userSchema);

const getUser = async (name, message) => {
    try {
        const user = new User({ name, message });
        await user.save();
        console.log("User saved successfully");
    } catch (error) {
        console.error("Error saving user:", error);
    }
};

module.exports = { getUser, User };