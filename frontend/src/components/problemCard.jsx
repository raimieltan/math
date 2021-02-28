import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz({ id, problem, solution, answer, addScore, index, formula }) {
    const [choices, setChoices] = useState([])
    const choicesLetters = [1, 2, 3, 4]
    const [blankInput, setBlankInput] = useState();


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

            //shuffle choices
            shuffleArray(parseRes)

            choicesLetters[0] = { id: parseRes[0].id, name: 'A.) ', content: parseRes[0].content, is_correct: parseRes[0].is_correct }
            choicesLetters[1] = { id: parseRes[1].id, name: 'B.) ', content: parseRes[1].content, is_correct: parseRes[1].is_correct }
            choicesLetters[2] = { id: parseRes[2].id, name: 'C.) ', content: parseRes[2].content, is_correct: parseRes[2].is_correct }
            choicesLetters[3] = { id: parseRes[3].id, name: 'D.) ', content: parseRes[3].content, is_correct: parseRes[3].is_correct }

            setChoices(choicesLetters)

        } catch (error) {
            console.error(error.message)

        }

    }

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            console.log(addScore())
        }
        else {
            console.log(isCorrect)
        }

        let choiceContainer = document.getElementById(`choices${id}`);
        choiceContainer.style.display = "none"
    }

    const onChange = (event) => {
        event.preventDefault();
        setBlankInput(event.target.value);
    }

    const handleAnswerSubmit = (event) => {
        event.preventDefault();
        let inputContainer = document.getElementById(`form${id}`);

        if (blankInput == answer) {
            console.log(addScore())
        } else {
            console.log(false)
        }
        inputContainer.style.display = "none"
    }


    useEffect(() => {
        fetchChoices(id)
    }, [])

    return (

        <div>
            <p>{problem}</p>
            {!formula ? (
                <div id={"choices" + id}>
                    {choices.map((c) => {

                        return <div key={c.id} class="choices">
                            <ul>
                                <li class="li-choices">
                                    <button value={c.content} onClick={() => { handleClick(c.is_correct) }}>{c.name + " " + c.content}</button>
                                </li>
                            </ul>
                        </div>
                    })}
                </div>

            )
                : (
                    <div id={"form" + id}>
                        <form onSubmit={handleAnswerSubmit}>
                            <input
                                id="blankInput"
                                value={blankInput}
                                onChange={onChange}
                                required
                            >
                            </input>
                            <button type="form">Submit</button>
                        </form>
                    </div>
                )}

        </div>


    )
}