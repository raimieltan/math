import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz({ id, problem, solution, answer }) {


    return (

        <div class="body-problem">
            <div className="problem-card">

                <div class="card border-info mb-3">
                    <div class="card-header">Question {id}</div>
                    <div class="card-body">
                        <p>{problem}</p>
                        <div>
                            {/* Solution: {solution} */}
                        </div>

                        <div>
                            {/* Answer: {answer} */}
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}