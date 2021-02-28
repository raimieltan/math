import { Fragment, React, useState, useEffect } from 'react';
import { create, all, random } from 'mathjs';

export default function Quiz() {
  const config = {};
  const math = create(all, config);

  const [problems, setProblems] = useState([]);
  const [variables, setVariables] = useState([]);
  const [newProblems, setNewProblems] = useState([]);

  const [multipleChoices, setMultipleChoices] = useState([]);

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

  const replaceQuestionVariables = async (problem, variable) => {

    try {

      for (let i = 0; i < problem.length; i++) {
        
        let question = problem[i].problem_question;
        let type = problem[i].problem_type;
        let choiceCount = problem[i].problem_choices_count;
        let formula = problem[i].problem_formula;
        let scope = {};

        for (let j = 0; j < variable[i].length; j++) {

          let newQuestion = question.replace(`${variable[i][j].variable}`, `${variable[i][j].value}`);
          scope[variable[i][j].variable] = variable[i][j].value;
          question = newQuestion;
        }
          
        let answer = (math.evaluate(formula, scope));
        
        setNewProblems(problem => problem.concat({ question: question, formula: formula, answer, choiceCount, type}))
        identifyChoiceProblems();

        console.log("NEW PROBLEMS:", problems);
      }
      
    } catch (error) {
      console.log("ERROR REPLACING VARIABLES: ", error.message);
    }
  }

  const identifyChoiceProblems = async () => {
    try {
      for (const problem of newProblems) {
        if (problem.type === 0) {
          setMultipleChoices(problem => problem.concat(problem));
        }
      }
      setNewProblems(newProblems.filter(problem => problem.type !== 0));
    } catch (error) {
      console.log("ERROR IDENTIFYING PROBLEMS: ", error.message);
    }
  }

  const assignChoices = async () => {
    try {
      for (const problem of multipleChoices) {
        const choicesArray = ['A', 'B', 'C', 'D', 'E', 'F'];
        let choiceValues = [];
        let choices = {};
  
        for (let i=0; i < problem.choiceCount - 1; i++) {
          choiceValues.push(randomVar(problem.answer - 10, problem.answer - 1));
        }
        choiceValues.push(problem.answer);
        
        const shuffledChoices = shuffle(choiceValues);
        choiceValues = shuffledChoices;
        
        for (let choice = 0; choiceValues.length; choice++) {
          choices[choicesArray[choice]] = choiceValues[choice];
        }
  
        setNewProblems(problem => 
          problem.concat({ 
            question: problem.question,
            formula: problem.formula,
            answer: problem.answer,
            type: problem.type,
            choices
          })
        )
      }
    } catch (error) {
      console.log("ERROR ASSIGNING CHOICES: ", error.message);
    }
  }

  console.log(problems);
  console.log(variables)
  
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
    assignChoices();
  }, [multipleChoices]);

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