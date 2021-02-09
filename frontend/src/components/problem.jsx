import { Fragment, useState, useEffect } from 'react';

export default function Quiz() {
  
  const [problems, setProblems] = useState([]);
  const [quizProblems, setQuizProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState();

  const fetchProblems = async () => {

    try {
      const response = await fetch ("http://localhost:8000/problems");
      const parseRes = response.json()
      setProblems(parseRes);
    } catch (error) {
      console.error("Error encountered on the frontend. ERROR: ", error.message);
    }
  }

  // const getQuizProblems = async () => {
    
  //   try {
      
  //   } catch (error) {
      
  //   }

  // }

  // const onChange = async (event) => {
  //   event.preventDefault();
  //   const problemId = event.target.id;
  //   setCurrentProblem(problems[problemId]);
  // }

  useEffect(() => {
    fetchProblems();
  }, [currentProblem]);

  console.log(problems);

  return (
    <Fragment>
      {problems.map((problem) => 
        <div> {problem.problem_id} </div>
      )}
    </Fragment>
  )
}