import React, { Fragment, useState, useEffect } from 'react';

export default function CreateProblem() {

  const [variables, setVariables] = useState([]);

  const [inputs, setInputs] = useState({
    question: "",
    formula: "",
    choiceCount: "",
    variableName: "",
    variableMin: "",
    variableMax: ""
  });

  const { question, formula, choiceCount, variableName, variableMin, variableMax } = inputs;

  // const handleType = (e) => {
  //   e.preventDefault();
  //   const id = e.target.value;
  //   setType(id);
  // }

  const fillInTheBlankSubmit = async (e) => {
    e.preventDefault();

    const body = { question, formula, choiceCount: null, type: 'fillInTheBlanks' };

    try {

      const response = await fetch("http://localhost:8000/problems/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json();
      const problemId = parseRes.rows[0].id;


      for (const addedVariables of variables) {

        try {

          const body = { variable: addedVariables.variable, min: addedVariables.min, max: addedVariables.max };

          const response = await fetch(`http://localhost:8000/variables/assign/${problemId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          })

          const parseRes = await response.json();

        } catch (error) {
          console.log("ERROR:", error.message);
        }

      }

      window.alert("Problem Added Successfully!")

    } catch (error) {
      console.log("ERROR:", error.message);
    }
  }

  const multipleChoiceSubmit = async (e) => {
    e.preventDefault();

    const body = { question, formula, choiceCount, type: 'multipleChoice' };

    try {

      const response = await fetch("http://localhost:8000/problems/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json();
      const problemId = parseRes.rows[0].id;


      for (const addedVariables of variables) {

        try {

          const body = { variable: addedVariables.variable, min: addedVariables.min, max: addedVariables.max };

          const response = await fetch(`http://localhost:8000/variables/assign/${problemId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          })

          const parseRes = await response.json();

        } catch (error) {
          console.log("ERROR:", error.message);
        }

      }

      window.alert("Problem Added Successfully!")

    } catch (error) {
      console.log("ERROR:", error.message);
    }
  }

  const handleInputs = (e) => {
    e.preventDefault();
    setInputs({
      question,
      formula,
      variableName,
      variableMin,
      variableMax,
      [e.target.id]: e.target.value
    })
  }

  const addVariable = (e) => {
    e.preventDefault();
    setVariables(variable => variable.concat({ variable: variableName, min: variableMin, max: variableMax }))
  }

  useEffect(() => {

  })

  return (
    <Fragment>

      {/* <select id="problemType" class="form form-select" onChange={handleType}>
        <option value="0">Multiple Choice</option>
        <option value="1">Fill in the Blanks</option>
      </select> */}

      {/* <div id="fillInTheBlanks">
        <form onSubmit={fillInTheBlankSubmit}>

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

          <span id="variable-inputs">
            <input
              id="variableName"
              value={variableName}
              placeholder="Variable Name"
              onChange={handleInputs}
            />
            <input
              type="number"
              id="variableMax"
              value={variableMax}
              placeholder="Max Value"
              onChange={handleInputs}
            />
            <input
              type="number"
              id="variableMin"
              value={variableMin}
              placeholder="Min Value"
              onChange={handleInputs}
            />
          </span>

          <div>
            <button id="add-variable" onClick={addVariable}>Add Variable</button>
          </div>

          <div class="container" id="variable-container">
            {variables.length !== 0
              ?
              variables.map(variable =>
                <div>
                  <div id="variable-box">
                    Variable Name: {variable.variable}<br />
                      Variable Min: {variable.min}<br />
                      Variable Max: {variable.max}<br />
                  </div>
                </div>
              )
              :
              ""
            }
          </div>

          <button id="form">Add Problem</button>
        </form>
      </div> */}

      <div id="multiple-choices">
        <form onSubmit={multipleChoiceSubmit}>

          <textarea
            placeholder="Enter Question Here"
            id="question"
            value={question}
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

          <span id="variable-inputs">
            <input
              id="variableName"
              value={variableName}
              placeholder="Variable Name"
              onChange={handleInputs}
            />
            <input
              type="number"
              id="variableMax"
              value={variableMax}
              placeholder="Max Value"
              onChange={handleInputs}
            />
            <input
              type="number"
              id="variableMin"
              value={variableMin}
              placeholder="Min Value"
              onChange={handleInputs}
            />
          </span>

          <button id="add-variables" onClick={addVariable}>Add Variable</button>

          <div class="container" id="variable-container">
            {variables.length !== 0
              ?
              variables.map(variable =>
                <div>
                  <div id="variable-box">
                    Variable Name: {variable.variable}<br />
                      Variable Min: {variable.min}<br />
                      Variable Max: {variable.max}<br />
                  </div>
                </div>
              )
              :
              ""
            }
          </div>

          <div>
            <input
              type="number"
              id="choiceCount"
              value={choiceCount}
              placeholder="Number of Choices"
              onChange={handleInputs}
            />
          </div>

          <button id="form">Add Problem</button>

        </form>
      </div>

    </Fragment>
  )
}