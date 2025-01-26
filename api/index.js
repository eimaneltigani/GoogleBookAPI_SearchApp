import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { createUser, getUser, updateUser } from "./dynamoService.js";

const app = express();
const PORT = 3001; 

app.use(express.json());

// invoke cors so we can run both apps locally
if (process.env.DEVELOPMENT) {
    app.use(cors({ origin: "*" }));
}

app.get("/", (req, res) => {
    res.json({message: "Hello from Express on AWS Lambda!"});
});

// Add user to db with empty favorites array
app.post("/favorites", async (req, res) => {
    try {
        const { userId } = req.body;
        await createUser(userId);
        res.status(201).json({ message: "User added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Error adding user."});
    }
})

// Get user's favorite
app.get("/favorites/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await getUser(userId);
        if(!response.Item) {
            return res.status(404).json({error: "User not found."});
        }
        res.status(200).json({ favorites: response.Item.favorites });
    } catch (err) {
        res.status(500).json({ error: "Error fetching user's favorites."});
    }
})

// Update user's favorites
app.put("/favorites/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { favorites } = req.body;
        const response = await updateUser({userId, favorites});
        res.status(200).json({ updatedFavorites: response.Attributes.favorites })
    } catch (err) {
        res.status(500).json({ error: "Error updating favorites."});
    }
})

// Run server
if (process.env.DEVELOPMENT) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost: ${PORT}`);
    });
}

export const handler = serverless(app);