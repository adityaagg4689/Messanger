const express = require("express");
const path = require("path");
const { getUser,User} = require("./models/db.js");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        console.log("Users from DB:", users);  
        res.render("index", { users });  
    } catch (error) {
        console.error("Error fetching users:", error);
        res.render("index",{ users: [] });
    }
});

app.post("/submit", async (req, res) => {
    const name = req.body.name || "Guest";
    const message = req.body.message || "No message provided";
    console.log(`Name: ${name}, Message: ${message}`);
    await getUser(name, message);
   
    res.redirect("/");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
