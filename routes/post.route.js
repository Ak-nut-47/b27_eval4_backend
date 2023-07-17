const { Router } = require("express")
const { PostModel } = require("../models/post.model")

const postRouter = Router()



postRouter.get("/", async (req, res) => {
    const { device1, device2 } = req.query;
    const { userID } = req.body;
    const query = {};
    if (userID) {
        query.userID = userID
    }
    if (device1 && device2) {
        query.device = { $and: [{ device: device1 }, { device: device2 }] }
    } else if (device2) {
        query.device = device2
    }
    try {
        const posts = await PostModel.find(query)
        res.status(200).json({ msg: "User Posts", posts })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postRouter.patch("/update/:postID", async (req, res) => {
    const { postID } = req.params;
    const { userID } = req.body;
    try {
        const post = await PostModel.findByIdAndUpdate(
            { userID, _id: postID },
            req.body
        );
        if (!post) {
            res.status(400).json({ msg: "Post Not Found" })
        } else {
            res.status(200).json({ msg: "Post Updated" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postRouter.delete("/delete/:postID", async (req, res) => {
    const { postID } = req.params;
    const { userID } = req.body;
    try {
        const post = await PostModel.findByIdAndDelete({ userID, _id: postID });
        if (!post) {
            res.status(400).json({ msg: "Post not found" })
        } else {
            res.status(200).json({ msg: "Post Deleted" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = { postRouter }