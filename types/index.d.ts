export interface IExam {
    _id: string;
    matter: string;
    level: number;
    questions: [
        {
            _id: string;
            question: string;
            rightAnswer: string;
            alternatives: Array<object>;
        }
    ];
}

export interface IAnswers {
    examId?: string;
    matter?: string;
    level?: string;
    answers?: [
        {
            questionId: string | undefined;
            selectedAlternative: string | undefined;
        }
    ];
}

export interface User {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
