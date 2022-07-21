import React, { useState } from "react";
import DutchCard from "../Card";
import PLayers from "../Players";
import AlertDismissible from "../AlertDismissible";
import "./DutchGame.css";

const DutchGame = () => {
  const coresBase = [
    { nome: "yellow", enabled: true },
    { nome: "red", enabled: true },
    { nome: "green", enabled: true },
    { nome: "blue", enabled: true },
  ];

  const itemPlacar = {
    onGame: true,
    bp: "",
    dp: "",
    score: 0,
    history: "",
    winner: false,
  };

  const [state, setState] = useState({
    red: { ...itemPlacar },
    green: { ...itemPlacar },
    yellow: { ...itemPlacar },
    blue: { ...itemPlacar },
    round: 1,
    endGame: false,
  });
  const [cores, setCores] = useState([...coresBase]);
  const [msgErro, setMsgErro] = useState("");

  function setParticipation(e, index) {
    const ischeck = e.target.checked;

    setMsgErro("");

    if (cores.filter((cor) => cor.enabled === true).length === 2 && !ischeck) {
      setMsgErro("Should have two/three/four playes");
      return;
    }

    const aux = Object.assign([], cores);

    aux[index].enabled = ischeck;

    setCores(aux);
  }

  function handleScore(event, index) {
    event.preventDefault();

    let valor = Object.assign({}, state);

    let err = "";

    setMsgErro("");

    cores.forEach((cor) =>
      (valor[cor.nome].bp === "" || valor[cor.nome].dp === "") && cor.enabled
        ? (err += `Fullfill ${cor.nome} fields. `)
        : ""
    );
    if (err.length > 0) {
      setMsgErro(err);
      return;
    }

    cores.forEach((cor) => {
      valor[cor.nome].score +=
        parseInt(valor[cor.nome].bp) - parseInt(valor[cor.nome].dp);
      valor[cor.nome].history = valor[cor.nome].history.concat(
        `(+${valor[cor.nome].bp}-${valor[cor.nome].dp})`
      );
      valor[cor.nome].bp = "";
      valor[cor.nome].dp = "";

      if (valor[cor.nome].score >= 75) {
        valor.endGame = true;
        valor[cor.nome].winner = true;
      }
    });

    valor.round++;

    setState({ ...valor });
  }

  function handleChange(e) {
    let corCampo = e.target.id.split("-");

    let valor = state[corCampo[0]];

    valor[corCampo[1]] = e.target.value;

    setState({ ...state, [corCampo[0]]: valor });
  }

  function newGame(e) {
    e.preventDefault();

    setState({
      red: { ...itemPlacar },
      green: { ...itemPlacar },
      yellow: { ...itemPlacar },
      blue: { ...itemPlacar },
      round: 1,
      endGame: false,
    });
  }

  return (
    <div className="DuchContainer">
      <div className="formEdge">
        <h3>Dutch Blitz Placar</h3>

        <input
          className="btn btn-light btn-sm button-topo"
          type="submit"
          value="New"
          onClick={newGame}
          data-testid="button-new"
        />
      </div>

      <div className="inicio">
        <span>Round: {state.round}</span>

        <PLayers
          cores={cores}
          handleCheck={setParticipation}
          round={state.round}
        />
      </div>

      <AlertDismissible erro={msgErro} handleErro={setMsgErro} />

      <form onSubmit={handleScore} id="form" data-testid="form">
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

          <div className="formEdge" data-testid="submit">
            <input
              className="btn btn-light btn-sm"
              type="submit"
              value="Count"
            />
          </div>
        </div>
      </form>

      <AlertDismissible erro={msgErro} handleErro={setMsgErro} />
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
  );
};

export default DutchGame;
