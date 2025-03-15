'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IExam } from '../../types';
import { MdArrowForward } from 'react-icons/md';
import { levelProof } from '@/functions/index.func';

export default function Home() {
    const [matters, setMatters] = useState<Array<IExam>>();

    async function fetchData() {
        try {
            const allMatters = await axios.get('/api/get/listAll');
            setMatters(allMatters.data);
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {matters?.map(({ _id, level, matter }, key) => (
                <div key={key} className="col-md-3 mx-auto card-item my-3">
                    <h5 className="font-weight-bold">{matter}</h5>
                    <p className="font-weight-bold">{levelProof(level)}</p>
                    <a href={`/questions/${_id}`}>
                        <button type="button" className="button">
                            Fazer prova <MdArrowForward />
                        </button>
                    </a>
                </div>
            ))}
        </>
    );
}
