import docClient from "../models/dynamoClient.js";

// Get a user's favorites
export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    const data = await docClient.get(params);

    if (data.Item) {
      res.status(200).json({ favorites: data.Item.favorites });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
};

// Add a book to favorites
export const addFavorite = async (req, res) => {
  const { userId } = req.params;
  const { book } = req.body;

  try {
    const params = {
      TableName: 'Users',
      Key: { userId },
      UpdateExpression: 'SET #fav = list_append(if_not_exists(#fav, :emptyList), :newBook)',
      ExpressionAttributeNames: { '#fav': 'favorites' },
      ExpressionAttributeValues: {
        ':emptyList': [],
        ':newBook': [book]
      },
      ReturnValues: 'UPDATED_NEW'
    };
    const data = await docClient.update(params);
    res.status(200).json({ message: 'Book added to favorites', updatedFavorites: data.Attributes.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Error adding book to favorites' });
  }
};

// Remove a book from favorites
export const deleteFavorite = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    const userData = await docClient.get(params);

    if (!userData.Item) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedFavorites = userData.Item.favorites.filter((book) => book.bookId !== bookId);

    const updateParams = {
      TableName: 'Users',
      Key: { userId },
      UpdateExpression: 'SET #fav = :updatedFavorites',
      ExpressionAttributeNames: { '#fav': 'favorites' },
      ExpressionAttributeValues: { ':updatedFavorites': updatedFavorites },
      ReturnValues: 'UPDATED_NEW'
    };
    await dynamoDbClient.update(updateParams);
    res.status(200).json({ message: 'Book removed from favorites', updatedFavorites });
  } catch (error) {
    res.status(500).json({ error: 'Error removing book from favorites' });
  }
};
