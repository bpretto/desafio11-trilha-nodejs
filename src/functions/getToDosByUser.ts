import { APIGatewayProxyHandler } from "aws-lambda";
import {document} from "../utils/dynamodbClient"

export const handle:APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const response = await document.scan({
        TableName: "to_dos",
        FilterExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
            ":user_id": id
        }        
    }).promise();

    const userToDos = response.Items

    if(userToDos) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                userToDos
            })
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "User doesn't exists!"
        })
    }
}