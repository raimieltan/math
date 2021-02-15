import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz({id, problem }) {
    

    return (

        <div>
            <div className="problem-card">

                <div class="card text-dark bg-info mb-3">
                <div class="card-header">Question {id}</div>
                    <div class="card-body">
                            <p>{problem}</p>
               
                    </div>
                </div>


            </div>
        </div>

    )
}