import { Fragment, React, useState, useEffect } from 'react';
import { create, all, random } from 'mathjs';

export default function Quiz() {
  const config = {};
  const math = create(all, config);

  const [problems, setProblems] = useState([]);
  const [variables, setVariables] = useState([]);
  const [newProblems, setNewProblems] = useState([]);

  const [fixedProblems, setFixedProblems] = useState([]);

  const [multipleChoices, setMultipleChoices] = useState([]);
  const [fillBlanks, setFillBlanks] = useState([]);

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
      console.log("ERROR FETCHING PROBLEMS:", error.message);
    }
  }

  console.log("PROBLEMS: ", problems);

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
        console.log("ERROR ASSIGNING VARIABLES: ", error.message);
      }
    }
  }

  console.log("VARIABLES: ", variables)

  const replaceQuestionVariables = async (problem, variable) => {

    try {

      if (problem.length !== 0) {

        for (let i = 0; i < problem.length; i++) {

          let question = problem[i].problem_question;
          let type = problem[i].problem_type;
          let choiceCount = problem[i].problem_choices_count;
          let formula = problem[i].problem_formula;
          let id = problem[i].problem_id;
          let scope = {};

          for (let j = 0; j < variable[i].length; j++) {

            let newQuestion = question.replace(`${variable[i][j].variable}`, `${variable[i][j].value}`);
            scope[variable[i][j].variable] = variable[i][j].value;
            question = newQuestion;
          }

          let answer = (math.evaluate(formula, scope));

          setNewProblems(problem => problem.concat({ id, question, formula, answer, choiceCount, type }))

          console.log("NEW PROBLEMS:", problems);
        }
      }

    } catch (error) {
      console.log("ERROR REPLACING VARIABLES: ", error.message);
    }
  }

  const identifyChoiceProblems = async () => {
    try {
      for (const problem of newProblems) {
        console.log(problem.type);

        if (problem.type === 1) {
          setMultipleChoices(p => p.concat(problem));
        }

        if (problem.type === 0) {
          setFillBlanks(p => p.concat(problem));
        }
      }

    } catch (error) {
      console.log("ERROR IDENTIFYING PROBLEMS: ", error.message);
    }
  }

  const assignChoices = async () => {
    try {

      const choicesArray = ['A', 'B', 'C', 'D', 'E', 'F'];

      if (multipleChoices.length !== 0) {
        for (const problem of multipleChoices) {
  
          let choiceValues = [];
          let choices = {};

          choiceValues.push(problem.answer);

          for (let i = 0; i < problem.choiceCount - 1; i++) {
            let randomValues = randomVar(problem.answer - 10, problem.answer - 1);

            let valuesIncluded = choiceValues.filter(value => value === randomValues);

            if (randomValues !== problem.answer && valuesIncluded.length !== 1) {
              choiceValues.push(randomVar(problem.answer - 10, problem.answer - 1));
            } else {
              choiceValues.push(randomVar(problem.answer - 10, problem.answer - 1));
            }

          }
          
          const shuffledChoices = shuffle(choiceValues);
          choiceValues = shuffledChoices;

          console.log(choiceValues);
          
          for (let i=0; i < choiceValues.length; i++) {
            choices[choicesArray[i]] = choiceValues[i];
          }

          setFixedProblems(newProblem =>
            newProblem.concat({
              question: problem.question,
              formula: problem.formula,
              answer: problem.answer,
              type: problem.type,
              choices
            })
          )

          setFixedProblems(newProblem => newProblem.concat(fillBlanks));
        }
      }
    } catch (error) {
      console.log("ERROR ASSIGNING CHOICES: ", error.message);
    }
  }

  console.log("MULTIPLE CHOICES: ", multipleChoices);
  console.log("FIXED PROBLEMS: ", fixedProblems);

  useEffect(() => {
    fetchProblems();
  }, [])

  useEffect(() => {
    assignVariables();
  }, [problems]);

  useEffect(() => {
    replaceQuestionVariables(problems, variables);
  }, [variables]);

  useEffect(() => {
    identifyChoiceProblems();
  }, [newProblems]);

  function hello() {
    console.log("hello");
  }

  useEffect(() => {
    assignChoices();
  }, [multipleChoices]);

  return (
    <Fragment>
      <div>
        {fixedProblems.length !== 0
          ? fixedProblems.map(problem =>
            <div>
              <p>{problem.type}</p>
              <p>{problem.question}</p>
              <p>{problem.answer}</p>

              <div>
                {problem.type === 0 
                  ?
                    <input type="text" placeholder="Enter Input Here"></input>
                  :
                    <p>A: {problem.choices.A} B: {problem.choices.B} C: {problem.choices.C} D: {problem.choices.D}</p>

                }
              </div>
            </div>
          )
          : ""
        }
      </div>
    </Fragment>
  )
}