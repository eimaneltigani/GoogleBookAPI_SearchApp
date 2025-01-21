import express from "express";
// import bodyParser from "body-parser";
import serverless from "serverless-http";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import favoritesRoutes from "./routes/favorites.js";

const app = express();
const PORT = 3001; 

app.use(express.json());

// invoke cors so we can run both apps locally
if (process.env.DEVELOPMENT) {
    app.use(cors());
}

// Routes
app.use('/auth', authRoutes);
app.use('/favorites', favoritesRoutes);

// Run server
if (process.env.DEVELOPMENT) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost: ${PORT}`);
    });
}

export const handler = serverless(app);