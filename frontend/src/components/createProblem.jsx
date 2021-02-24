import { Fragment, React, useState, useEffect } from 'react';

const createProblem = () => {
  
  const [variables, setVariables] = useState([]);
  const [multipleChoice, setMultipleChoices] = useState([]);
  const [choice, setChoice] = useState();
  const [inputs, seInputs] = useState({
    question: "",
    formula: ""
  });

  const addChoice = (event) => {
    event.preventDefault();
    setMultipleChoice(choices => choices.concat({ choice }))
  }

  return (
    <Fragment>

      <form>

        <select id="problemType" class="form form-select" onChange={}>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="fill-in-the-blanks">Fill in the Blanks</option>
        </select>

        <div>
          <input placeholder="Enter Question Here"></input>
          <input placeholder="Enter Formula Here"></input>
          <input 
            id="variableCount" 
            type="number" 
            value={} 
            onChange={}
            placeholder="How many variables?"
          > 
          </input>
          <input>

          </input>
        </div>

        <div>
          <input placeholder="Enter Question Here"/>
          <input placeholder="Enter Formula Here"/>
          
          <input
            id="choice"
            value={}
            onChange={}
            placeholder="Add choices"
          />

          <button type="button" onClick={addChoice}>Add choices</button>

          <div class="choiceContainter">
            {}
          </div>
        </div>
      </form>


    </Fragment>
  )
}

export default createProblem;