'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IExam } from '../../types';


export default function Home() {

    const [matters, setMatters] = useState<Array<IExam>>();
    const levelsProof = ['Facil', 'Médio', 'Díficil'];

    async function fetchData() {
        try {
            const allMatters = await axios.get('/api/get/listAll');
            setMatters(allMatters.data);
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(()=> {
        fetchData();
    }, []);

    return (
        <>
            <div className="form-row col-md-10 mx-auto text-center mt-5 pt-5">
                {matters?.map((element, key)=> (
                    <div key={key} className="col-md-2 card p-4 m-1">
                        <h3 className='text-3xl font-bold'>{element.matter}</h3>
                        <p>Nivel da prova: <b>{levelsProof[element.level]}</b></p>
                        <a href={`/questions/${element._id}`}>
                            <button 
                                type='button' 
                                className='btn btn-dark'>
                                Fazer prova
                            </button>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
