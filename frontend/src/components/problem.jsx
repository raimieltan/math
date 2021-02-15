import { Fragment, useState, useEffect } from 'react';
import './style.css';
import ProblemCard from './problemCard'

export default function Quiz() {

  const [problems, setProblems] = useState([]);
  const [quizProblems, setQuizProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState();

  const fetchProblems = async () => {

    try {
      const response = await fetch("http://localhost:8000/problems");
      const parseRes = await response.json()
      setProblems(parseRes);
    } catch (error) {
      console.error("Error encountered on the frontend. ERROR: ", error.message);
    }
  }

  useEffect(() => {
    fetchProblems();
  }, []);

  console.log(problems);

  return (

    <div>
      <div class="header">
        <div>

          <a href="/">
            <div id="logo"></div>
          </a>

          <ul>
            <li class="selected">
              <a href="/main-page">Home</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/learn">Learn</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="body-problem">

        <h1>Problems</h1>
        {problems.map((p) => {
          return <div key={p.id}>

            <div className="problem-card">

              <div class="card border-info mb-3">
                <div class="card-header">Question {p.problem_id} </div>
                <div class="card-body text-infoy">
                  <p class="card-text">
                    {p.problem_title}

                    <ProblemCard
                      id={p.problem_id}
                      solution={p.problem_solution}
                      answer={p.problem_answer} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>

    </div>

  )
}