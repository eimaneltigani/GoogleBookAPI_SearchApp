import docClient from "../dynamoService.js";

// Add new user to db 
export const addUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const params = {
      TableName: 'Users',
      Item: {
        userId,
        favorites: [] // Initialize with empty favorites
      }
    };
    await docClient.put(params);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get user from db
export const getUserFavorites = async (req, res) => {
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
export const updateUserFavorites = async (req, res) => {
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
