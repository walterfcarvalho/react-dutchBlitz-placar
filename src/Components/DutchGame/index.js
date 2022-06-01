import React, { useState } from 'react'
import DutchCard from './Card'
import './DutchGame.css'


const DutchGame = () => {
  
  const itemPlacar = {
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner:false
  }

  const [state, setState] = useState({ red:{...itemPlacar},green:{...itemPlacar},yellow:{...itemPlacar},blue:{...itemPlacar}, round: 1, endGame:false })
  
  const cores = ['green', 'red', 'yellow', 'blue']

  function handleScore(event) {
    event.preventDefault()
    
    let valor = Object.assign({}, state)

    cores.forEach(cor => {
      valor[cor].score += valor[cor].bp - valor[cor].dp
      valor[cor].history = valor[cor].history.concat( `(+${valor[cor].bp}-${valor[cor].dp})` ) 
      valor[cor].bp = "" 
      valor[cor].dp = ""
      
      if (valor[cor].score >= 75) {
        valor.endGame = true
        valor[cor].winner = true
      }
    })
    
    valor.round ++


    setState({ ...valor })
  }

  function handleChange(e) {
      let corCampo = e.target.id.split('-')

    let valor = state[corCampo[0]]

    valor[corCampo[1]] = e.target.value   

    setState({...state, [corCampo[0]]: valor })

  }

  function newGame(e){
    e.preventDefault()

    setState({ red:{...itemPlacar},green:{...itemPlacar},yellow:{...itemPlacar},blue:{...itemPlacar}, round: 1, endGame:false })
    console.log(state)
  }

  return (
    <div className="DuchContainer">

      <div className='inicio'>
        <span>Round : {state.round}</span>
        <input type="submit" value="New game" onClick={newGame} />
      </div>

      <form onSubmit={handleScore} id="form">
        <input type="submit" value="Count"/>
        <DutchCard logo="dutchCardYellow" color="yellow" score={state['yellow']} handleChange = {handleChange} isEndGame={state.endGame} />
        <DutchCard logo="dutchCardRed" color="red" score={state['red']} handleChange = {handleChange} isEndGame={state.endGame} />
        <DutchCard logo="dutchCardGreen" color="green" score={state['green']} handleChange = {handleChange} isEndGame={state.endGame} />
        <DutchCard logo="dutchCardBlue" color="blue" score={state['blue']} handleChange = {handleChange} isEndGame={state.endGame} />
      </form>
    </div>
  )
}

export default DutchGame