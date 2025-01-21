import docClient from "../models/dynamoClient.js";

// Create a new user
export const createUser = async (req, res) => {
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

// Login user (pseudo-login for now)
export const loginUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const params = {
      TableName: 'Users',
      Key: { userId }
    };
    const data = await docClient.get(params);

    if (data.Item) {
      res.status(200).json({ message: 'Login successful', user: data.Item });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
