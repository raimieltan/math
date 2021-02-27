import { Fragment, React, useState, useEffect } from 'react';
import { create, all } from 'mathjs';

export default function Quiz() {
  const config = {};
  const math = create(all, config);

  const [problems, setProblems] = useState([]);
  const [variables, setVariables] = useState([]);
  const [newProblems, setNewProblems] = useState([]);
  const [choices, setChoices] = useState([]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = math.floor(math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const fetchProblems = async () => {

    try {

      const response = await fetch("http://localhost:8000/problems/fetch")
      const parseRes = await response.json()

      const shuffledProblems = shuffle(parseRes);
      setProblems(shuffledProblems);

    } catch (error) {
      console.log("ERROR:", error.message);
    }
  }

  const randomVar = (min, max) => {
    min = math.ceil(min);
    max = math.ceil(max);

    return math.round(math.random() * (max - min) + min)

  }

  const assignVariables = async () => {

    for (const problem of problems) {
      try {

        const response = await fetch(`http://localhost:8000/variables/fetch/${problem.id}`);
        const parseRes = await response.json();

        let variableArray = [];

        for (const variables of parseRes) {
          variableArray.push({
            variable: variables.variable,
            value: randomVar(variables.variable_min, variables.variable_max)
          })
        }

        setVariables(variable => variable.concat([variableArray]));

      } catch (error) {
        console.log("ERROR: ", error.message);
      }
    }
  }

  const replaceQuestionVariables = async (problem, variable) => {

    try {

      for (let i = 0; i < problem.length; i++) {
        
        let question = problem[i].problem_question;
        let formula = problem[i].problem_formula;
        let scope = {};

        for (let j = 0; j < variable[i].length; j++) {

          let newQuestion = question.replace(`${variable[i][j].variable}`, `${variable[i][j].value}`);
          scope[variable[i][j].variable] = variable[i][j].value;
          question = newQuestion;
        }

        console.log(formula);
        console.log(question);
        console.log(scope);
        let answer = (math.evaluate(formula, scope));
        
        setNewProblems(problem => problem.concat({ question: question, formula: formula, answer}))
        
        console.log("NEW PROBLEMS:", newProblems);
      }
      
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }
  
  const x = 1;
  const y = 2;

  console.log("PROBLEMS", problems);
  console.log("VARIABLES:", variables);
  
  useEffect(() => {
    fetchProblems();
  }, [])

  useEffect(() => {
    assignVariables();
  }, [problems]);

  useEffect(() => {
    replaceQuestionVariables(problems, variables);
  }, [variables]);

  return (
    <Fragment>
      <div>
      {newProblems.length !== 0
          ? newProblems.map(problem =>
            <div>
              <p>{problem.question}</p>
              <p>{problem.answer}</p>
            </div>
          )
          : ""
        }
      </div>
    </Fragment>
  )
}