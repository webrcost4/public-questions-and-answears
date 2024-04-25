import mongoose from 'mongoose';

import '../database';

const examSchema = new mongoose.Schema({
    matter: {
        type: String,
        unique: true,
        required: true,
    },
    questions: {
        type: <Array<object>>[
            {
                question: { type: String, require: true },
                rightAnswer: { type: String, require: true },
                alternatives: { type: Array, require: true },
            },
        ],
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
});

export default mongoose.models['exam'] || mongoose.model('exam', examSchema);
