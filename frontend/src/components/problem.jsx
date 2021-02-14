import { Fragment, useState, useEffect } from 'react';
import './style.css';
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
      <h1>Problems</h1>

      {problems.map((p) => {
        return <div key={p.id} className="problem-card">

          <div class="card text-dark bg-info mb-3">
            <div class="card-header">Question category</div>
            <div class="card-body">
              <h5 class="card-title">Question {p.id}</h5>
              <p class="card-text">
                <p>{p.problem}</p>
                <p>{p.problem_solution}</p>
              </p>
            </div>
          </div>
        </div>

      })}
    </div>

  )
}