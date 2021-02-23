import { Fragment, useState, useEffect } from 'react';
import './style.css';
import ProblemCard from './problemCard'

export default function Quiz() {
  // variable_x: 56, variable_y: 36
  const [problems, setProblems] = useState([]);
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [choices, setChoices] = useState([])
  const choicesLetters = [1, 2, 3, 4]
  const [variables, setVariables] = useState({});
  const [currentProblem, setCurrentProblem] = useState({});
  const [blankInput, setBlankInput] = useState();
  const [showSolution, setShowSolution] = useState(false);
  const [correct, setCorrect] = useState();

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


  const fetchProblems = async () => {

    try {
      const response = await fetch("http://localhost:8000/problems");
      const parseRes = await response.json()
      shuffleArray(parseRes)
      setProblems(parseRes);
      console.log(problems)

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
            answer: eval("variables.variable_x * variables.variable_y"),
            solution: 'Multiply the values.'
          },

          {
            id: 2,
            problem: `What is the difference of ${variables.variable_x} - ${variables.variable_y}`,
            answer: eval("variables.variable_x - variables.variable_y"),
            solution: 'Subtract the values.'
          },

          {
            id: 3,
            problem: `What is the sum of ${variables.variable_x} and ${variables.variable_y}`,
            answer: eval("variables.variable_x + variables.variable_y"),
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



  const addScore = () => {
    setScore(score + 1)

  }

  const submitTest = () => {
    setShowScore(true)
  }


  const handleSubmit = (event) => {
    event.preventDefault();

  }

  return problems.length > 0 ? (

    <div>

      {showScore ? (
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
          <h1>Your score is {score} </h1>
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

            <div>

              <div id="carouselExampleControls" class="carousel slide" data-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <ProblemCard
                      id={currentProblem.id}
                      problem={currentProblem.problem}
                      solution={currentProblem.solution}
                      answer={currentProblem.answer}
                      addScore={addScore}
                      index={problems.length}
                      formula={true}
                    />
                  </div>
                  {
                    problems.map((problem) => {
                      return <div class="carousel-item">
                        <ProblemCard
                          id={problem.problem_id}
                          problem={problem.problem_title}
                          solution={problem.problem_solution}
                          answer={problem.problem_answer}
                          addScore={addScore}
                          index={problems.indexOf(problem)}
                          formula={false}
                        />
                      </div>

                    })
                  }

                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">

                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>

                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true">                </span> 
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div >
              <button class = "submit-button" onClick={() => { submitTest() }}>Submit Quiz</button>
            </div>
          </div>
        )}

    </div>



  ) : (
      <h1>Loading..</h1>
    )
} 