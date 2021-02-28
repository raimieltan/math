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

  const randomVar = (min, max) => {
    min = math.ceil(min);
    max = math.ceil(max);

    return math.round(math.random() * (max - min) + min)

  }

  console.log("PROBLEMS: ", problems);

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

  console.log("VARIABLES: ", variables);

  const replaceQuestionVariables = async () => {

    try {

      for (let i = 0; i < problems.length; i++) {

        let question = problems[i].problem_question;
        let type = problems[i].problem_type;
        let choiceCount = problems[i].problem_choices_count;
        let formula = problems[i].problem_formula;
        let id = problems[i].id;
        let scope = {};

        for (let j = 0; j < variables[i].length; j++) {

          let newQuestion = question.replace(`${variables[i][j].variable}`, `${variables[i][j].value}`);
          scope[variables[i][j].variable] = variables[i][j].value;
          question = newQuestion;
        }

        let answer = (math.evaluate(formula, scope));

        let filterDuplicate = newProblems.filter(p => p.id === id);

        if (filterDuplicate.length === 0) {
          setNewProblems(p => p.concat({ id, question, formula, answer, choiceCount, type }))
        }
      }


    } catch (error) {
      console.log("ERROR REPLACING VARIABLES: ", error.message);
    }
  }

  console.log("NEW PROBLEMS: ", newProblems);

  const identifyProblems = async () => {
    try {

      for (const problem of newProblems) {

        console.log("CURRENT PROBLEM", problem);

        if (problem.type === 1) {
          
          let filterDuplicate = multipleChoices.filter(p => p.id === problem.id);

          if (filterDuplicate.length === 0) {
            setMultipleChoices(p => p.concat(problem));
          }

        }

        if (problem.type === 0) {
          
          let filterDuplicate = fillBlanks.filter(p => p.id === problem.id);

          if (filterDuplicate.length === 0) {
            setFillBlanks(p => p.concat(problem));
          }

        }
      }

    } catch (error) {
      console.log("ERROR IDENTIFYING PROBLEMS: ", error.message);
    }
  }

  console.log("MULTIPLE CHOICES: ", multipleChoices)
  console.log("FILLBLANKS: ", fillBlanks);

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

          for (let i = 0; i < choiceValues.length; i++) {
            choices[choicesArray[i]] = choiceValues[i];
          }

          let filterDuplicate = fixedProblems.filter(p => p.id === problem.id);

          if (filterDuplicate.length === 0) {
            setFixedProblems(newProblem =>
              newProblem.concat({
                id: problem.id,
                question: problem.question,
                formula: problem.formula,
                answer: problem.answer,
                type: problem.type,
                choices
              })
            )
          }
        }
      }

      for (const fillBlankProblem of fillBlanks) {
        let filterDuplicate = fixedProblems.filter(p => p.id === fillBlankProblem.id);

        if (filterDuplicate.length === 0) {
          setFixedProblems(p => p.concat(fillBlankProblem));
        }
      }

    } catch (error) {
      console.log("ERROR ASSIGNING CHOICES: ", error.message);
    }
  }

  console.log("FINAL PROBLEMS", fixedProblems);

  const shuffleFinalProblems = () => {
    
  }

  useEffect(() => {
    fetchProblems();
  }, [])

  useEffect(() => {
    assignVariables();
  }, [problems]);

  useEffect(() => {
    replaceQuestionVariables();
  }, [variables]);

  useEffect(() => {
    identifyProblems();
  }, [newProblems]);

  useEffect(() => {
    assignChoices();
  }, [multipleChoices]);

  return (
    <Fragment>
      <div>
        {fixedProblems.length !== 0
          ? fixedProblems.map(problem =>
            <div>
              <p>{problem.type === 1 ? "Multiple Choices Problems" : "Fill In The Blanks"}</p>
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