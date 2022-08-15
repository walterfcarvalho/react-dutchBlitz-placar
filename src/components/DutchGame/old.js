import React, { useState } from "react"
import DutchCard from "../Card"
import PLayers from "../Players"
import AlertDismissible from "../AlertDismissible"
import "./DutchGame.css"

const DutchGamex = () => {
  const coresBase = [
    { nome: "yellow", enabled: true },
    { nome: "red", enabled: true },
    { nome: "green", enabled: true },
    { nome: "blue", enabled: true },
  ]

  const itemPlacar = {
    onGame: true,
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner: false,
  }

  const [state, setState] = useState({
    red: { ...itemPlacar },
    green: { ...itemPlacar },
    yellow: { ...itemPlacar },
    blue: { ...itemPlacar },
    round: 1,
    endGame: false,
  })
  const [cores, setCores] = useState([...coresBase])
  const [msgError, setMsgError] = useState({ show: false, text: "" })

  function setParticipation(e, index) {
    const ischeck = e.target.checked
    
    setMsgError({ show: false, text: "" })
    if (cores.filter((cor) => cor.enabled === true).length === 2 && !ischeck) {
      setMsgError({ show: true, text: "Should have two/three/four playes" })
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

    cores.forEach((cor) =>
      (valor[cor.nome].bp === "" || valor[cor.nome].dp === "") && cor.enabled
        ? (err += `Fullfill ${cor.nome} fields. `)
        : ""
    )

    if (err.length > 0) {
      setMsgError({ show: false, text: "" })
      setMsgError({ show: true, text: err })
      return
    }

    cores.forEach((cor) => {
      valor[cor.nome].score +=
        parseInt(valor[cor.nome].bp) - parseInt(valor[cor.nome].dp)
      valor[cor.nome].history = valor[cor.nome].history.concat(
        `(+${valor[cor.nome].bp}-${valor[cor.nome].dp})`
      )
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
    let corCampo = e.target.id.split("-")

    let valor = state[corCampo[0]]

    valor[corCampo[1]] = e.target.value

    setState({ ...state, [corCampo[0]]: valor })
  }

  function newGame(e) {
    e.preventDefault()

    setState({
      red: { ...itemPlacar },
      green: { ...itemPlacar },
      yellow: { ...itemPlacar },
      blue: { ...itemPlacar },
      round: 1,
      endGame: false,
    })
  }

  return (
    <div className="DuchContainer">
      <div className="formEdge">
        <h3>Dutch Blitz Placar</h3>

        <input type="submit" value="New" onClick={newGame} />
      </div>

      <div className="contentWeapper">
        <div className="inicio">
          <div className="round"> Round: {state.round}</div>
          <PLayers
            cores={cores}
            handleCheck={setParticipation}
            round={state.round}
          />
        </div>

        <AlertDismissible erro={msgError} handleErro={setMsgError} />
        <form onSubmit={handleScore} id="form">
          <div className="accordion" id={"head"}>
            {cores.map((cor, index) => (
              <div key={index}>
                <DutchCard
                  cor={cor}
                  score={state[cor.nome]}
                  handleChange={handleChange}
                  isEndGame={state.endGame}
                />
              </div>
            ))}
          </div>
          <div className="buttonContainer">
            <input type="submit" value="Count" />
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

export default DutchGamex