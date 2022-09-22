import React from "react"
import "./card.css"
import Input from "../Input"
import {IDuchCard} from '../../interfaces'

const DutchCard = ({ infoCard, handleInputValue, isEndGame }: IDuchCard ) => {
  return (
    <div className="dutchCard">
      <div
        data-testid={`accordion-item-${infoCard.nome}`}
        className="accordion-item"
        hidden={!infoCard.enabled}
      >
        <h2 className="accordion-header" id={`head${infoCard.nome}`}>
          <button
            className={`accordion-button collapsed acbt`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${infoCard.nome }`}
            aria-expanded="true"
            aria-controls={`collapse${infoCard.nome}`}
          >
            <div className="imagem">
              <img
                src={require(`./../../images/dutchCard${infoCard.nome}.png`)}
                alt="descricao"
              />
            </div>

            <div className="scores">
              <Input
                inputLabel="+"
                tpOp={"bp"}
                color={infoCard.nome}
                score={infoCard.bp}
                handleChange={handleInputValue}
                isDisabled={isEndGame}
              />

              <Input
                inputLabel={"-"}
                tpOp={"dp"}
                color={infoCard.nome}
                score={infoCard.dp}
                handleChange={handleInputValue}
                isDisabled={isEndGame}
              />

              <Input
                inputLabel={"Total"}
                tpOp={"total"}
                color={infoCard.nome}
                score={infoCard.score}
                handleChange={handleInputValue}
                isDisabled={true}
              />
            </div>
          </button>
        </h2>
        <div
          id={`collapse${infoCard.nome}`}
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <span>History:</span> {infoCard.history}
          </div>
        </div>
      </div>
        
      {infoCard.winner 
        ? <img data-testid={`winner-${infoCard.nome}`}  className='imagem' src={require(`./../../images/crown2.png`)} alt="winner" /> 
        : null}

    </div>
  );
};

export default DutchCard;
