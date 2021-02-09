import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz() {
  
  const [problems, setProblems] = useState([]);
  const [quizProblems, setQuizProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState();

  const fetchProblems = async () => {

    try {
      const response = await fetch ("http://localhost:8000/problems");
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

        {problems.map( (p) => {
          return <div className="problem-card">
            
            <p>{p.problem}</p>
            <p>{p.problem_solution}</p>
            </div>
          
        })}
      </div>

  )
}