import { Fragment, useState, useEffect } from 'react';
import './style.css';
import ProblemCard from './problemCard'

export default function Quiz() {

  const [problems, setProblems] = useState([{ problem_id: 1 }]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const [choices, setChoices] = useState([])
  const choicesLetters = [1, 2, 3, 4]

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


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const fetchChoices = async (id) => {

    try {

      const response = await fetch(`http://localhost:8000/choices/${id}`)
      const parseRes = await response.json()

      shuffleArray(parseRes)

      choicesLetters[0] = { id: parseRes[0].id, name: 'A.) ', content: parseRes[0].content, is_correct: parseRes[0].is_correct }
      choicesLetters[1] = { id: parseRes[1].id, name: 'B.) ', content: parseRes[1].content, is_correct: parseRes[1].is_correct }
      choicesLetters[2] = { id: parseRes[2].id, name: 'C.) ', content: parseRes[2].content, is_correct: parseRes[2].is_correct }
      choicesLetters[3] = { id: parseRes[3].id, name: 'D.) ', content: parseRes[3].content, is_correct: parseRes[3].is_correct }

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
            <ProblemCard
              id={problems[currentQuestion].problem_id}
              problem={problems[currentQuestion].problem_title}
              solution={problems[currentQuestion].problem_solution}
              answer={problems[currentQuestion].problem_answer}
            />

            <div id={'quiz' + problems[currentQuestion].problem_id} className="choices-buttons">
              {choices.map((c) => {

                return <div class = "choices">
                  <ul>
                    <li class="li-choices">
                      <button  value={c.content} onClick={() => handleNextOptionClick(c.is_correct)}>{c.name + " " + c.content}</button>
                    </li>
                  </ul>
                </div>
              })}
            </div>


          </div>
        )}
    </div>

  ) : (
      <h1>Loading..</h1>
    )
} 