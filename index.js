const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { auth } = require("./middlewares/auth.middleware")
const { postRouter } = require("./routes/post.route")
require("dotenv").config();

const app = express();

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/posts", auth, postRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to database")
        console.log(`Server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})