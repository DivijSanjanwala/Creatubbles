import { QuestionType, Question } from '../interfaces/index';
import crypto from 'crypto';


// ! for now as it's never null
const API_URL: string = process.env.API_URL_DEV!;

const generateID = (question: string): string => {
    // Generate SHA-1 hash and convert to hexadecimal
    return crypto.createHash('sha1').update(question).digest('hex');
}

export async function fetchRequestAPI() {
    const headers = {
        'Accept': 'application/json'
    };
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers,
    }
    );

    const json = await response.json();

    if (json.error) {
        console.log(json.error);
        throw new Error("Failed to fetch API");
    }

    // cast each json into Question
    json.forEach((question: QuestionType, index: number) => {
        json[index] = new Question(generateID(question.question), question);
    });

    return json.map((question: Question) => {
        return {
            id: question.id,
            data: question.data
        }
    }
    );
}