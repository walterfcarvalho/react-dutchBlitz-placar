// import React from "react"
import "./card.css"
import Input from "../Input"
import {IDuchCard} from '../../interfaces'

const DutchCard = ({ infoCard, handleInputValue, isEndGame }: IDuchCard ) => {
  return (
    <div className= {`dutchCard ${infoCard.winner ? "winner": "" } `}  >

      {infoCard.winner  &&
        <span >Winner!!! &#127942;&#127942;&#x1F3C6;</span>
      }

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
            <div className="s">
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
            {infoCard.history}
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default DutchCard;
