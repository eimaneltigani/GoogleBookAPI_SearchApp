import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Configure DynamoDB
const client = new DynamoDBClient({ region: 'us-east-1' }); // Replace with your region
const docClient = DynamoDBDocumentClient.from(client);

export default docClient;
