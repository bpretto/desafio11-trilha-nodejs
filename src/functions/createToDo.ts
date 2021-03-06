import { v4 as uuidv4 } from 'uuid';
import { document } from "../utils/dynamodbClient"

interface IToDo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: string
}

export const handle = async (event) => {
    const { id: user_id} = event.pathParameters
    const { title, deadline } = JSON.parse(event.body)
    const id = uuidv4()

    const toDo:IToDo = {
        id,
        user_id,
        title,
        done: false,
        deadline: deadline
    }

    await document.put({
        TableName: "to_dos",
        Item: toDo
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "To do created!",
            toDo
        }),
        headers: {
            "Content-type": "application/json"
        }
    }
}