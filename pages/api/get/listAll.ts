import type { NextApiRequest, NextApiResponse } from 'next';
import examSchema from '../../../db/schemas/exam.schema';

export default async function listAllMatter(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const matter = await examSchema.find({}).select({ questions: false });

            res.json(matter);
        } catch (error) {
            res.status(400).json('Erro ao criar um exame');
        }
    } else {
        return res.status(400).json({ message: 'Error' });
    }
}
