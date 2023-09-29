import { QuestionType, Question, Questionnaire } from '../interfaces/index';

// ! for now as it's never null
const API_URL: string = process.env.API_URL_DEV!;

async function fetchRequestAPI() {
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
        json[index] = new Question(index.toString(), question);
    });

    return json   
}



export async function fetchQuestionnaireData(): Promise<Question[]> {
    const data = await fetchRequestAPI();
    const questionnaire = new Questionnaire(data);

    return questionnaire.data.map((question) => {
        return {
            id: question.id,
            data: question.data
        }
    }
    );
}
