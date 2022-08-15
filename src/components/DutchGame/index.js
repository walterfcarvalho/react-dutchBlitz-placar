import React, { useState } from "react"
import DutchCard from "../Card"
import PLayers from "../Players"
import AlertDismissible from "../AlertDismissible"
import "./DutchGame.css"

const DutchGame = () => {
  const itemPlacar = {
    onGame: true,
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner: false,
  }

  const coresBase = [
    { nome: "yellow", enabled: true, ...itemPlacar },
    { nome: "red", enabled: true, ...itemPlacar },
    { nome: "green", enabled: true, ...itemPlacar },
    { nome: "blue", enabled: true, ...itemPlacar },
  ]

  const [myState, setMyState] = useState({round:1, endGame:false, colors:[...coresBase]})

  const [msgError, setMsgError] = useState({text: "" })

  function setParticipation(e, index) {
    const ischeck = e.target.checked
    
    setMsgError({text: "" })

    if ( myState.colors.filter((cor) => cor.enabled === true).length === 2 && !ischeck) {
      setMsgError({text: "Should have two/three/four playes" })
      return
    }

    const aux = Object.assign([], myState)

    aux.colors[index].enabled = ischeck

    setMyState(aux)
  }

  function handleScore(event, index) {
    event.preventDefault()

    let aux = Object.assign({}, myState)

    let err = ""

    aux.colors.forEach( cor =>
      ( cor.bp === "" || cor.dp === "" ) && cor.enabled
        ? (err += `Fullfill ${cor.nome} fields. `)
        : ""
    )

    if (err.length > 0) {
      setMsgError({text: err })
      return
    }

    aux.colors.forEach( cor => {
      cor.score +=
        parseInt(cor.bp) - parseInt(cor.dp)
      cor.history = cor.history.concat(
        `(+${cor.bp}-${cor.dp})`
      )
      cor.bp = ""
      cor.dp = ""

      if (cor.score >= 75) {
        aux.endGame = true
        cor.winner = true
      }
    })

    aux.round++

    setMyState({ ...aux })
  }

  function handleChange(e) {
    let values = e.target.id.split("-")

    let idx = myState.colors.findIndex( color => color.nome === values[0] )

    let aux = Object.assign({}, myState)

    aux.colors[idx][values[1]] = (e.target.value)

    setMyState(aux)
  }

  function newGame(e) {
    e.preventDefault()

    setMyState({round:1, endGame:false, colors:[...coresBase]})
  }

  return (
    <div className="duchContainer">
      <div className="formEdge">
        <h3>Dutch Blitz Placar</h3>

        <input data-testid="button-new" type="submit" value="New" onClick={newGame} />
      </div>

      <div className="contentWeapper">
        <div className="inicio">
          <div className="round"> Round: { myState.round }</div>
          <PLayers
            cores={ myState.colors }
            handleCheck={setParticipation}
            round={ myState.round}
          />
        </div>

        <AlertDismissible erro={msgError} handleErro={setMsgError} />

        <form onSubmit={handleScore} id="form">
          <div className="accordion" id={"head"}>
            { myState.colors.sort( (a,b) => a.score < b.score ? 1 : -1 )
            .map((infoCard, index) => (
              <div key={index}>
                <DutchCard
                  infoCard={infoCard}
                  handleChange={handleChange}
                  isEndGame={myState.endGame}
                />
              </div>
            ))}
          </div>
          <div className="buttonContainer">
            <input data-testid="submit" type="submit" value="Count" />
          </div>
        </form>
      </div>

      <div className="formLink">
        <div>
          <a
            className="link-dark"
            href="https://www.wikihow.com/Play-Dutch-Blitz"
            rel="noopener noreferrer"
            target="_blank"
          >
            How to play?
          </a>
        </div>

        <div className="imagem">
          <img
            src={require(`./../../images/GitHub-Mark-32px.png`)}
            alt="Logo GitHub"
          />
          <a
            className="link-dark"
            href="https://github.com/walterfcarvalho/react-dutchBlitza-placar"
            rel="noopener noreferrer"
            target="_blank"
          >
            react-dutchBlitz-placar
          </a>
        </div>
      </div>
    </div>
  )
}

export default DutchGame