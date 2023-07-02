const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const discover = require("./routes/discover");
const admin = require("./routes/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const mongoUrl = process.env.MONGODB_URI;
mongoose.set('strictQuery', true).connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log("Database not connected " + err);
});


app.get("/health", (req, res) => {
    res.send(`Backend server is active status:active & time: ${new Date()}`);
})

app.use("/admin", admin);
app.use("/discover", discover);

// APIs to serve contents.
app.get("/", (req,res)=>{
    res.render(__dirname + "/views/index.ejs");
});


app.use((req, res, next) => {
    const err = new Error("Something went wrong! Please try after some time.");
    err.status(404);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});




/* server listener */
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
    console.log(`Express server is listening at http://${host}:${port}`);
});