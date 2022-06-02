import React, { useState } from 'react'
import DutchCard from './Card'
import './DutchGame.css'

const DutchGame = () => {

  const itemPlacar = {
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner: false
  }

  const [state, setState] = useState({ red: { ...itemPlacar }, green: { ...itemPlacar }, yellow: { ...itemPlacar }, blue: { ...itemPlacar }, round: 1, endGame: false })

  const cores = ['green', 'red', 'yellow', 'blue']

  function handleScore(event) {
    event.preventDefault()

    let valor = Object.assign({}, state)

    let err = ""

    cores.forEach( cor => (valor[cor].bp === "" || valor[cor].dp === "") ? err += `\r Pls fullfill ${cor} fields`: "")
    if (err.length > 0){
      window.alert(err)
      return
    }

    cores.forEach(cor => {
      valor[cor].score += valor[cor].bp - valor[cor].dp
      valor[cor].history = valor[cor].history.concat(`(+${valor[cor].bp}-${valor[cor].dp})`)
      valor[cor].bp = ""
      valor[cor].dp = ""

      if (valor[cor].score >= 75) {
        valor.endGame = true
        valor[cor].winner = true
      }
    })

    valor.round++

    setState({ ...valor })
  }

  function handleChange(e) {
    let corCampo = e.target.id.split('-')

    let valor = state[corCampo[0]]

    valor[corCampo[1]] = e.target.value

    setState({ ...state, [corCampo[0]]: valor })

  }

  function newGame(e) {
    e.preventDefault()

    setState({ red: { ...itemPlacar }, green: { ...itemPlacar }, yellow: { ...itemPlacar }, blue: { ...itemPlacar }, round: 1, endGame: false })
    console.log(state)
  }

  return (
    <div className="DuchContainer">

      <div className='topo'>
        <h3>Dutch Blitz</h3>
        <input className="btn btn-light btn-sm button-topo" type="submit" value="New" onClick={newGame} />
      </div>


      <div className='inicio'>
        <span>Round : {state.round}</span>
      </div>

      <form onSubmit={handleScore} id="form">
        <div className="accordion" id={"head"}>

          <DutchCard logo="dutchCardYellow" color="yellow" score={state['yellow']} handleChange={handleChange} isEndGame={state.endGame} />
          <DutchCard logo="dutchCardRed" color="red" score={state['red']} handleChange={handleChange} isEndGame={state.endGame} />
          <DutchCard logo="dutchCardGreen" color="green" score={state['green']} handleChange={handleChange} isEndGame={state.endGame} />
          <DutchCard logo="dutchCardBlue" color="blue" score={state['blue']} handleChange={handleChange} isEndGame={state.endGame} />
          
          <div className="topo baixo">
            <input type="submit" value="Count" />
          </div>
        </div>

        <a href= "https://www.wikihow.com/Play-Dutch-Blitz" target="_blank">
          Wikihow Dutch Blitz
        </a>

      </form>
    </div>
  )
}

export default DutchGame