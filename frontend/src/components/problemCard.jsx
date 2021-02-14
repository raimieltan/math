import { Fragment, useState, useEffect } from 'react';
import './style.css';
export default function Quiz( {id , problem , solution }) {

    const [choices ,setChoices ] = useState([])

    function shuffleArray(array) {
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
            setChoices(parseRes)
            
        } catch (error) {
            console.error(error.message)

        }
    }

    useEffect(() => {

        fetchChoices(id)
        
    },[])


  return (

    <div>
        <div className="problem-card">

          <div class="card text-dark bg-info mb-3">
            <div class="card-header">Question category</div>
            <div class="card-body">
              <p class="card-text">
                <p>{problem}</p>
             
              </p>
            </div>
          </div>
          {choices.map( (c) => {

            return <div key={c.id}>
                <button>{c.content}</button>
                </div>
            } )}
        </div>


    </div>

  )
}