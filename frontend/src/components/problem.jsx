import { Fragment, useState, useEffect } from 'react';
import './style.css';
import ProblemCard from './problemCard'

export default function Quiz() {
  // variable_x: 56, variable_y: 36
  const [problems, setProblems] = useState([{ problem_id: 1 }]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [choices, setChoices] = useState([])
  const choicesLetters = [1, 2, 3, 4]
  const [variables, setVariables] = useState({});
  const [currentProblem, setCurrentProblem] = useState({});

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const answer = (type, values) => {
    if (type === 'Multiplication') {
      return values.variable_x * values.variable_y;
    }

    if (type === 'Subtraction') {
      return values.variable_x - values.variable_y;
    }

    if (type === 'Addition') {
      return values.variable_x + values.variable_y;
    }
  }

  console.log(variables);

  const fetchProblems = async () => {

    try {
      const response = await fetch("http://localhost:8000/problems");
      const parseRes = await response.json()
      setProblems(parseRes);

    } catch (error) {
      console.error("Error encountered on the frontend. ERROR: ", error.message);
    }
  }

  const fetchValues = async () => {

    try {

      const response = await fetch("http://localhost:8000/variables")
      const parseRes = await response.json()

      //shuffle values
      shuffleArray(parseRes);
      setVariables(parseRes[0]);

    } catch (error) {
      console.error(error.message);
    }

  }

  const fetchQuestions = () => {

    try {

      let fillBlanksProblems =
        [
          {
            id: 1,
            problem: `Use long multiplication to calculate ${variables.variable_x} X ${variables.variable_y}`,
            answer: answer('Multiplication', variables),
            solution: 'Multiply the values.'
          },

          {
            id: 2,
            problem: `What is the difference of ${variables.variable_x} - ${variables.variable_y}`,
            answer: answer('Subtraction', variables),
            solution: 'Subtract the values.'
          },

          {
            id: 3,
            problem: `What is the sum of ${variables.variable_x} and ${variables.variable_y}`,
            answer: answer('Addition', variables),
            solution: 'Add the values.'
          }
        ]

      // shuffle questions
      shuffleArray(fillBlanksProblems);
      setCurrentProblem(fillBlanksProblems[0]);
    
    } catch (error) {
      console.error("ERROR:", error.message)
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, [variables])

  useEffect(() => {
    fetchValues();
    fetchProblems();
  }, []);

  const fetchChoices = async (id) => {

    try {

      const response = await fetch(`http://localhost:8000/choices/${id}`)
      const parseRes = await response.json()

      //shuffle choices
      shuffleArray(parseRes)

      choicesLetters[0] = { id: parseRes[0].id, name: 'A', content: parseRes[0].content, is_correct: parseRes[0].is_correct }
      choicesLetters[1] = { id: parseRes[1].id, name: 'B', content: parseRes[1].content, is_correct: parseRes[1].is_correct }
      choicesLetters[2] = { id: parseRes[2].id, name: 'C', content: parseRes[2].content, is_correct: parseRes[2].is_correct }
      choicesLetters[3] = { id: parseRes[3].id, name: 'D', content: parseRes[3].content, is_correct: parseRes[3].is_correct }

      setChoices(choicesLetters)
      console.log(choices)

    } catch (error) {
      console.error(error.message)

    }

  }

  useEffect(() => {
    fetchChoices(problems[currentQuestion].problem_id)
  }, [currentQuestion])


  const handleNextOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }
    else {
      console.log(isCorrect)
    }
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < problems.length - 1) {
      setCurrentQuestion(nextQuestion)
    }
    else {
      setShowScore(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  return problems.length > 0 ? (

    <div>
      {showScore ? (
        <div>
          You scored {score} out of {problems.length - 1}
        </div>
      ) : (

          <div>
            <div class="header">

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

            {/* <div>
              <ProblemCard
                id={problems[currentQuestion].problem_id}
                problem={problems[currentQuestion].problem_title}
                solution={problems[currentQuestion].problem_solution}
                answer={problems[currentQuestion].problem_answer}
              />

              <div id={'quiz' + problems[currentQuestion].problem_id}>
                {choices.map((c) => {

                  return <div class="choices">
                    <ul>
                      <li class="li-choices">
                        <button value={c.content} onClick={() => handleNextOptionClick(c.is_correct)}>{c.name + " " + c.content}</button>
                      </li>
                    </ul>
                  </div>
                })}
              </div>
            </div> */}

            <div>
              <ProblemCard
                id={currentProblem.id}
                problem={currentProblem.problem}
                solution={currentProblem.solution}
                answer={currentProblem.answer}
              />
              <div>
                  <form id="fillBlanks" onSubmit={handleSubmit}>
                    <input id="blankInput"></input>
                    <button type="form">Submit</button>
                  </form>
              </div>
            </div>

          </div>
        )}
    </div>

  ) : (
      <h1>Loading..</h1>
    )
} 