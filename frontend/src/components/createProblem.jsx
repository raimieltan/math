import React, { Fragment, useState, useEffect } from 'react';

export default function CreateProblem() {

  // const [variables, setVariables] = useState([]);
  // const [multipleChoice, setMultipleChoices] = useState([]);
  const [type, setType] = useState(1);
  // const [choice, setChoice] = useState();

  const [inputs, setInputs] = useState({
    question: "",
    formula: ""
  });

  const { question, formula } = inputs;

  const handleType = (e) => {
    e.preventDefault();
    const id = e.target.value;
    setType(id);
  }

  const handleInputs = (e) => {
    e.preventDefault();
    setInputs({
      question,
      formula,
      [e.target.id]: e.target.value
    })
  }
  
  useEffect(() => {
    
  }, [type])

  return (
    <Fragment>

      <select id="problemType" class="form form-select" onChange={handleType}>
        <option value="0">Multiple Choice</option>
        <option value="1">Fill in the Blanks</option>
      </select>
      
      <div>
        <form>
          <textarea
            placeholder="Enter Question Here"
            id="question"
            value={question}
            rows="2"
            cols="10"
            class="form-control"
            onChange={handleInputs}
          />
          <input
            placeholder="Enter Formula Here"
            id="formula"
            value={formula}
            class="form-control"
            onChange={handleInputs}
          />
        </form>
      </div>

      {/* 
      <div>
        <form>
          <input placeholder="Enter Question Here" />
          <input placeholder="Enter Formula Here" />

          <button type="button" onClick={addChoice}>Add choice</button>

          <div class="choiceContainter">
            { }
          </div>
        </form>
      </div> */}

    </Fragment>
  )
}