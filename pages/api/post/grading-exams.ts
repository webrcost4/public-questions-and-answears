import type { NextApiRequest, NextApiResponse } from 'next';
import examSchema from '../../db/schemas/exam.schema';
import { IAnswers, IExam } from '../../../types';

interface IElement {
    questionId: string;
}

export default async function gradingExams(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { examId, answers }: IAnswers = req.body;
            let hits = 0,
                errors = 0;

            /*
             ** Requisicoes a base de dados
             */
            const exam = await examSchema.findOne<IExam>({ _id: examId });

            // calculating final exam score
            const calculatingExam = (hits: number, errors: number): number => {
                const totalGrade = (hits / (hits + errors)) * 100;
                return Math.floor(totalGrade);
            };

            /*
             ** Comparando as respostas do suario com as do banco de dados
             */
            answers.forEach((element: IElement, key: number) => {
                if (exam?.questions[key]._id == element.questionId)
                    if (exam.questions[key].rightAnswer === answers[key].selectedAlternative) hits++;
                    else errors++;
            });

            const totalGrade = calculatingExam(hits, errors);
            /*
             **  Calculando a media, verificando se o usuario tem um certificado se nao tive add ele no banco de dados.
             */
            if (totalGrade >= 60) {
                return res.json({ hits, errors, isApproved: true });
            } else {
                return res.json({ hits, errors, isApproved: false });
            }
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        return res.status(400).json({ message: 'Error' });
    }
}
