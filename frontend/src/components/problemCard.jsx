import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz({ id, problem, solution, answer }) {

    const [choices, setChoices] = useState([])
    const [results, setResults] = useState(``)
    const choicesLetters = [1,2,3,4]


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const getButtonValue = (e) => {
        e.preventDefault();
        checkCorrectAnswer(e.target.value)
    }

    const checkCorrectAnswer = (value) => {
        const quizDiv = document.getElementById(`quiz${id}`)
        quizDiv.style.display = "none"
        if (value === answer) {
            console.log("Nice")
            setResults(<h2>Correct Answer</h2>)
        }
        else {
            setResults(<p>Wrong answer, The solution is: {solution}</p>)
        }
    }
    const fetchChoices = async (id) => {

        try {

            const response = await fetch(`http://localhost:8000/choices/${id}`)
            const parseRes = await response.json()

            shuffleArray(parseRes)

            choicesLetters[0] = {id: parseRes[0].id, name: 'A' , content: parseRes[0].content}
            choicesLetters[1] = {id: parseRes[1].id, name: 'B' , content: parseRes[1].content}
            choicesLetters[2] = {id: parseRes[2].id, name: 'C' , content: parseRes[2].content}
            choicesLetters[3] = {id: parseRes[3].id, name: 'D' , content: parseRes[3].content}
           
            setChoices(choicesLetters)

        } catch (error) {
            console.error(error.message)

        }
    }

    useEffect(() => {

        fetchChoices(id)

    }, [])


    return (

        <div>
            <div className="problem-card">

                <div class="card text-dark bg-info mb-3">
                    <div class="card-header">Question category</div>
                    <div class="card-body">
                        <p class="card-text">
                            <p>{problem}</p>
                            <div className="resultDiv"><div>

                                {results}

                            </div></div>
                        </p>
                    </div>
                </div>
                <div id={'quiz' + id}>
                    {choices.map((c) => {

                        return <div key={c.id}>
                            <button value={c.content} onClick={(e) => getButtonValue(e)}>{c.name + " " + c.content}</button>
                        </div>
                    })}
                </div>

            </div>


        </div>

    )
}