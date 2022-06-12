
import React, { useState } from 'react'
import DutchCard from '../Card'
import PLayers  from '../Players'
import './DutchGame.css'

const DutchGame = () => {
  
  const coresBase = [
    {nome:'yellow', enabled:true}, 
    {nome:'red', enabled:true}, 
    {nome:'green', enabled:true}, 
    {nome:'blue', enabled:true}
  ]
  
  const itemPlacar = {
    onGame:true,
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner: false
  }

  const [state, setState] = useState({ red: { ...itemPlacar }, green: { ...itemPlacar }, yellow: { ...itemPlacar }, blue: { ...itemPlacar }, round: 1, endGame: false})
  const [cores, setCores] = useState([...coresBase])

  function setParticipation(e, index) {
    const ischeck = e.target.checked
    
    if (cores.filter(cor=> cor.enabled === true ).length === 2 && !ischeck  ){
      window.alert('Should have two/three/four playes')
      return
    }
    
    const aux = Object.assign([], cores)

    aux[index].enabled = ischeck
    
    setCores(aux)

  }

  function handleScore(event, index) {
    event.preventDefault()

    let valor = Object.assign({}, state)

    let err = ""

    cores.forEach(cor => ((valor[cor.nome].bp === "" || valor[cor.nome].dp === "") && cor.enabled ) ? err += `\r Pls fullfill ${cor} fields` : "")
    if (err.length > 0) {
      window.alert(err)
      return
    }

    cores.forEach(cor => {
      valor[cor.nome].score += parseInt(valor[cor.nome].bp) - parseInt(valor[cor.nome].dp)
      valor[cor.nome].history = valor[cor.nome].history.concat(`(+${valor[cor.nome].bp}-${valor[cor.nome].dp})`)
      valor[cor.nome].bp = ""
      valor[cor.nome].dp = ""

      if (valor[cor.nome].score >= 75) {
        valor.endGame = true
        valor[cor.nome].winner = true
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
        <h3>Dutch Blitz Placar</h3>

        <input className="btn btn-light btn-sm button-topo" type="submit" value="New" onClick={newGame} />
      </div>


      <div className='inicio'>
        <span>Round: {state.round}</span>

        <PLayers 
          cores= {cores} 
          handleCheck={setParticipation}
          round={state.round}
        /> 

      </div>

      <form onSubmit={handleScore} id="form">
        <div className="accordion" id={"head"}>

          { cores.map( (cor, index) => 
            <div key ={index} >
              <DutchCard 
                cor = {cor}
                score={state[cor.nome]} 
                handleChange={handleChange}
                isEndGame={state.endGame} 
              />
            </div>
          )}

          <div className="topo baixo">
            <input className="btn btn-light btn-sm" type="submit" value="Count" />
          </div>

        </div>

        <a href="https://www.wikihow.com/Play-Dutch-Blitz" rel="noreferrer" target="_blank">
          Wikihow Dutch Blitz
        </a>

      </form>


    </div>
  )
}

export default DutchGame