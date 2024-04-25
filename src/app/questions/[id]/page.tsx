'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IExam } from '../../../../types';

interface IResult {
	hits: number;
	errors: number;
	isApproved: boolean;
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

    useEffect(()=> {
        fetchData();
    }, []);


    const handleSubmit = async (event) => {

        event.preventDefault();
        let formData : Array<object> = [];
        for (const field of event.target.elements) {
            
            if (field.name && field.checked === true) {
                formData = [...formData, {
                    questionId: field.name,
                    selectedAlternative: field.value
                }];
            }
        }

        try {
            const response = await axios.post('/api/post/grading-exams', { 
                answers: formData, 
                examId: questions?._id 
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
                        <h1>Párabens voce foi aprovado</h1>
                    ) : (
                        <>
                            <h1>Infelizmente voce nao foi aprovado</h1>
                            <button onClick={()=>window.location.reload()}>Refazer prova</button>
                        </>
                    )}
                </>) : (
                <>
                    {questions !== undefined ? (
                        <>
                            <h1 className='text-center py-5'>{questions?.matter}</h1>

                            <form method="post" onSubmit={handleSubmit} className='col-md-7 border p-5 text-center mx-auto'>
                                {questions?.questions.map((elements, key)=> (
                                    <div key={key}>
                                        <h3>{elements.question}</h3>
                                        {Object.entries(elements.alternatives[0])
                                            .map((alternatives, key)=>(
                                                <div key={key}>
                                                    <span className='text-uppercase mr-2'>
                                                        {alternatives[0]}
                                                    </span>
                                                    <input 
                                                        type="radio" 
                                                        id={`q${elements._id}${key}`} 
                                                        value={alternatives[0]} 
                                                        name={elements._id}
                                                        required={true}
                                                    />
                                                    <label 
                                                        className='ml-1'
                                                        htmlFor={`q${elements._id}${key}`}>
                                                        {alternatives[1]}
                                                    </label>
                                                </div>
                                            ))}
                                        <hr />
                                    </div>
                                ))}

                                <input 
                                    type="submit" 
                                    value="Finalizar prova" 
                                    className='btn btn-dark'
                                    onClick={()=> {
                                
                                    }}
                                />
                            </form>
                        </>): (
                        <h1>Error</h1>
                    )}
                </>
            )}
            
        </main>
    );
}
