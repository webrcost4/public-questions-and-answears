'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IExam } from '../../../../types';
import { levelProof } from '@/functions/index.func';
import { MdArrowBack } from 'react-icons/md';

interface IResult {
    hits: number;
    errors: number;
    isApproved: boolean;
    totalGrade: number;
}

interface FormField {
    name: string;
    checked: boolean;
    value: string;
}

export default function Home({ params }: { params: { id: string } }) {
    const [questions, setQuestions] = useState<IExam>();
    const [result, setResult] = useState<IResult>();

    async function fetchData() {
        try {
            const allQuestions = await axios.get(`/api/get/questions/${params.id}`);
            setQuestions(allQuestions.data[0]);
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: { questionId: string; selectedAlternative: string }[] = [];
        const formElements = (event.currentTarget as HTMLFormElement).elements as unknown as FormField[];
        for (const field of formElements) {
            if (field.name && field.checked) {
                formData.push({
                    questionId: field.name,
                    selectedAlternative: field.value,
                });
            }
        }
        console.log('Valores submetidos:', formData);

        try {
            const response = await axios.post('/api/post/gradingExams', {
                answers: formData,
                examId: questions?._id,
            });

            setResult(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            {result ? (
                <>
                    {result.isApproved === true ? (
                        <div className="text-center pt-5 mt-5">
                            <h1>Párabens você foi aprovado</h1>
                            <h3>Sua nota foi: {result.totalGrade}%</h3>
                            <button onClick={() => (window.location.href = '/')} className="btn btn-dark">
                                Fazer outra
                            </button>
                        </div>
                    ) : (
                        <div className="text-center pt-5 mt-5">
                            <h1>Infelizmente você não foi aprovado</h1>
                            <h3>Sua nota foi: {result.totalGrade}%</h3>
                            <button onClick={() => window.location.reload()} className="button-2">
                                Refazer prova
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {questions !== undefined ? (
                        <section className="col-md-8 text-left mx-auto mb-5">
                            <a href="/">
                                <MdArrowBack size={25} className="my-3" color="#1c1c1c" />
                            </a>

                            <div>
                                <h1 className="py-1">{questions?.matter}</h1>
                                <h5 className="pb-5">{levelProof(questions.level)}</h5>
                            </div>

                            <form method="post" onSubmit={handleSubmit}>
                                {questions?.questions.map(({ _id, alternatives, question }, key) => (
                                    <div key={key}>
                                        <h3>{question}</h3>
                                        {Object.entries(alternatives[0]).map((alternatives, key) => (
                                            <div key={key}>
                                                <span className="text-uppercase mr-2">{alternatives[0]}</span>
                                                <input
                                                    type="radio"
                                                    id={`q${_id}${key}`}
                                                    value={alternatives[0]}
                                                    name={_id}
                                                    required={true}
                                                />
                                                <label className="ml-1" htmlFor={`q${_id}${key}`}>
                                                    {alternatives[1]}
                                                </label>
                                            </div>
                                        ))}
                                        <hr />
                                    </div>
                                ))}

                                <input type="submit" value="Finalizar prova" className="button-2" onClick={() => {}} />
                            </form>
                        </section>
                    ) : (
                        <h1>Error</h1>
                    )}
                </>
            )}
        </main>
    );
}
