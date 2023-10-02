export type QuestionType = {
    imageUrl?: string;
    question: string;
    options?: string[];
    answer: number;
    time?: number;
}

export class Question {

    constructor(public id: string, public data: QuestionType) {
        this.id = this.id
        this.data = data;
    }

}

export class Questionnaire {
    constructor(
        public data: Question[]
    ) {
        this.data = data;
    }

    public getQuestionByIndex(index: number): Question | undefined {
        return this.data[index];
    }

    public getQuestionByID(id: string): Question | undefined {
        return this.data.find((question) => question.id === id);
    }

}