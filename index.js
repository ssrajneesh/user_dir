const express = require("express")
const dotenv = require("dotenv").config()

const app = express()

const port = process.env.PORT || 5000
console.log(port)
app.use(express.json());
app.use("/api",require("./Routes/routes"))

app.listen(port,()=>{
    console.log({response:"json",port_no:port})
})