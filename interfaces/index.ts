// Type Declaration for the QuestionType Object
export type QuestionType = {
    imageUrl?: string;
    question: string;
    options?: string[];
    answer: number;
    time?: number;
}


export class Question {
    constructor(public id: string, public data: QuestionType) {
        this.data = data;
        this.id = this.id;
    }
}


export class Questionnaire {
    constructor(
        public data: Question[]
    ) {
        this.data = data;
    }

    public getQuestionByID(id: string): Question | undefined {
        return this.data.find((question) => question.id === id);
    }

    public getQuestionByIndex(index: number): Question | undefined {
        return this.data[index];
    }
}


