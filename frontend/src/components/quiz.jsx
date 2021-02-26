import { Fragment, React, useState, useEffect } from 'react';

export default function Quiz() {

  const [problems, setProblems] = useState([]);
  
  const fetchProblems = async () => {

    try {
      
      const response = await fetch("http://localhost:8000/problems/fetch")
      const parseRes = await response.json()   
      setProblems(parseRes);

    } catch (error) {
      console.log("ERROR:", error.message);
    }
  }

  console.log(problems)

  useEffect(() => {
    fetchProblems();
  }, [])

  return (
    <Fragment>
      
    </Fragment>
  )
}