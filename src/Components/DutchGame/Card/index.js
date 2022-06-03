import './card.css'
import Input from './Input'

const DutchCard = ({ logo, color, score, handleChange, isEndGame }) => {

  return (
    <div className={`dutchCard`}>

        <div className="accordion-item">
          <h2 className="accordion-header" id={`head${color}`}>
            <button className={`accordion-button collapsed ${color}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${color}`} aria-expanded="true" aria-controls={`collapse${color}`}>

              <div className="imagem">
                <img src={require(`./../../../images/${logo}.png`)} alt="descricao" />
              </div>

              <div className="scores">

                <Input inputLabel={"+"} tpOp={"bp"} color={color} score={score.bp} handleChange={handleChange} isDisabled={isEndGame} />
     
                <Input inputLabel={"-"} tpOp={"dp"} color={color} score={score.dp} handleChange={handleChange} isDisabled={isEndGame} />

                <Input inputLabel={"Total"} tpOp={""} color={color} score={score.score} handleChange={handleChange} isDisabled={true} />

              </div>
            </button>
          </h2>
          <div id={`collapse${color}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>History:</strong> {score.history}
            </div>
          </div>
        </div>

        {score.winner ? <img className='imgwinner' src={require(`./../../../images/crown.png`)} alt="winner" /> : null}


    </div>


  )
}

export default DutchCard