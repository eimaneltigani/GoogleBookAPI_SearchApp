import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
    DynamoDBDocumentClient,
    PutCommand,
    GetCommand,
    UpdateCommand 
} from "@aws-sdk/lib-dynamodb";

// Configure DynamoDB
const client = new DynamoDBClient({ region: 'us-east-2' }); 
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "UserFavorites";

// POST user
export const createUser = async (userId) => {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            userId,
            favorites: [], // Initalize as empty array
        },
    })

    const response = await docClient.send(command);

    return response;
}

// GET user
export const getUser = async (userId) => {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId },
    });

    const response = await docClient.send(command);

    return response;
}

// UPDATE user
export const updateUser = async ({ userId, favorites }) => {
    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userId },
        UpdateExpression: "set favorites = :favorites",
        ExpressionAttributeValues: {
            ":favorites": favorites,
        },
        ReturnValues: "UPDATED_NEW",
    })

    const response = await docClient.send(command);

    return response;
}

