const connectDB= require('./db/connect')
const express = require("express");
const bodyParser= require('body-parser')
const app = express();


app.use(bodyParser.json())
app.use("/users", require("./routes/users"));

// app.get("/ping", (req, res) => {
//     return res.send({
//         error: false,
//         message: "Ping......",
//     });
// });

const PORT =process.env.port|| 5000;
const start= async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
         console.log(`Server is listening on PORT : ${PORT}` );
       });
    } catch (error) {
        console.log(error)
    }
}

start();
