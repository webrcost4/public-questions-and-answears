import type { NextApiRequest, NextApiResponse } from 'next';
import examSchema from '../../../../db/schemas/exam.schema';

export default async function listAllDisciplines(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            const disciplines = await examSchema.find({ _id: id }).select({ 'questions.rightAnswer': false });

            res.json(disciplines);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar um exame' });
        }
    } else {
        return res.status(400).json({ message: 'Error' });
    }
}
