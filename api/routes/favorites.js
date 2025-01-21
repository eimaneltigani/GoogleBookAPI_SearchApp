import express from "express";
import{ getFavorites, addFavorite, deleteFavorite } from "../controllers/favoritesController.js";

const router = express.Router();

// Get a user's favorites
router.get('/:userId', getFavorites);

// Add a book to favorites
router.post('/:userId', addFavorite);

// Remove a book from favorites
router.delete('/:userId/:bookId', deleteFavorite);

export default router;
