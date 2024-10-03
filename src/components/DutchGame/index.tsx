import React, { ChangeEvent, useState } from "react"
import DutchCard from "../Card/index"
import PLayers from "../Players"
import Footer  from '../Footer/footer'
import AlertDismissible from "../AlertDismissible"
import "./DutchGame.css"
import { IPLacar } from '../../interfaces/index'

const itemPlacar = {
  onGame: true,
  bp: 0,
  dp: 0,
  score: 0,
  history: "",
  winner: false,
  enabled: true
}

const coresBase = [
  { nome: "yellow", ...itemPlacar },
  { nome: "red", ...itemPlacar },
  { nome: "green", ...itemPlacar },
  { nome: "blue", ...itemPlacar },
]
const DutchGame = () => {
  const [myState, setMyState] = useState<IPLacar>({ round: 1, endGame: false, colors: [...coresBase] })

  const [msgError, setMsgError] = useState<string>("")

  const setParticipation = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const isCheck = e.target.checked

    setMsgError("")

    if (myState.colors.filter((cor) => cor.enabled === true).length === 2
      && !isCheck) {
      setMsgError("Should have two or more players")
      return
    }

    const aux = {...myState}

    aux.colors[index].enabled = isCheck

    setMyState(aux)
  }

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue  = e.target.value
    
    let fields: string[] = e.target.id.split("-")
    
    setMyState(oldState => (
      {
        ...oldState,

        colors: oldState.colors.map( color => 
            color.nome === fields[0] 
          ? {...color, [fields[1]]: newValue }     
          : color   
        )
      }
    ))
   }


  const handleScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let aux = {...myState}

    let err = ""

    aux.colors.forEach(cor => (
      (cor.bp === 0 || cor.dp === 0) && cor.enabled
      ? (err += `${cor.nome}, `)
      : ""
    ))

    if (err.length > 0) {
      setMsgError(`Inform values for: ` + err.substring(0, err.length-2).concat('.'))
      return
    }

    aux.colors.forEach(cor => {
      cor.score +=
        (cor.bp) - (cor.dp)
      cor.history = cor.history.concat(
        `(+${cor.bp}-${cor.dp})`
      )
      cor.bp = 0
      cor.dp = 0

      if (cor.score >= 75) {
        aux.endGame = true
        cor.winner = true
      }
    })

    aux.round++

    aux.colors.sort((a, b) => a.score < b.score ? 1 : -1)

    setMyState({ ...aux })
    setMsgError('' )
  }


  function newGame(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()

    setMyState({ round: 1, endGame: false, colors: [...coresBase] })
  }

  return (
    <div className="duchContainer">
      <div className="formEdge">
        <h3>Dutch Blitz Placar</h3>

        <input data-testid="button-new" type="submit" value="New" onClick={newGame} />
      </div>

      <div className="contentWeapper">
        <div className="inicio">
          <div className="round"> Round: {myState.round}</div>
          <PLayers
            cores={myState.colors}
            handleCheck={setParticipation}
            round={myState.round}
          />
        </div>

        <AlertDismissible erro={msgError} handleErro={setMsgError} />

        <form onSubmit={handleScore} id="form">
            {myState.colors.map((infoCard, index) => (
              <div className="accordion" id={"head"}>
                <div key={index}>
                  <DutchCard
                    infoCard={infoCard}
                    handleInputValue={handleInputValue}
                    isEndGame={myState.endGame}
                  />
                </div>
            </div>
              ))}
          <div className="buttonContainer">
            <input 
              data-testid="submit" 
              type="submit" 
              value="Count" 
            />
          </div>
        </form>
      </div>

      <Footer />

    </div>
  )
}

export default DutchGame
