import React from 'react'
import './card.css'
import Input from '../Input'

const DutchCard = ({ cor, score, handleChange, isEndGame, chave }) => {

  return <div className={`dutchCard`}>

        <div data-testid={`accordion-item-${cor.nome}`} className="accordion-item" hidden={!cor.enabled}   >
          <h2 className="accordion-header" id={`head${cor.nome}`}>
            <button className={`accordion-button collapsed ${cor.nome} acbt${cor.nome}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${cor.nome}`} aria-expanded="true" aria-controls={`collapse${cor.nome}`}>

              <div className="imagem">
                <img src={require(`./../../images/dutchCard${cor.nome}.png`)} alt="descricao" />
              </div>

              <div className="scores">

                <Input inputLabel={"+"} tpOp={"bp"} color={cor.nome} score={score.bp} handleChange={handleChange} isDisabled={isEndGame} />
     
                <Input inputLabel={"-"} tpOp={"dp"} color={cor.nome} score={score.dp} handleChange={handleChange} isDisabled={isEndGame} />

                <Input inputLabel={"Total"} tpOp={""} color={cor.nome} score={score.score} handleChange={handleChange} isDisabled={true} />

              </div>
            </button>
          </h2>
          <div id={`collapse${cor.nome}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>History:</strong> {score.history}
            </div>
          </div>
        </div>

        
        {score.winner ? <img className='imgwinner' src={require(`./../../images/crown.png`)} alt="winner" data-testid={`winner-${cor.nome}`} /> : null}

    </div>

}

export default DutchCard