import './card.css'


const DutchCard = ({ logo, color, score, handleChange, isEndGame }) => {

  function colapse(e){
    console.log( 'ok')
  }

  return (
    <div className={`dutchCard`}>

        <div className="accordion-item" onBlur={colapse} >
          <h2 className="accordion-header" id={`head${color}`}>
            <button className={`accordion-button collapsed ${color}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${color}`} aria-expanded="true" aria-controls={`collapse${color}`}>

              <div className="imagem">
                <img src={require(`./../../../images/${logo}.png`)} alt="descricao" />
              </div>

              <div className="scores">
                <input min={0} max={99} className={`${color} bpdp`} id={`${color}-bp`} type="number" value={score.bp} onChange={handleChange} disabled={isEndGame} />
                <input min={0} max={99} className={`${color} bpdp`} id={`${color}-dp`} type="number" value={score.dp} onChange={handleChange} disabled={isEndGame} />
                <input min={0} max={99} className={`${color} bpdp`} id={`${color}-dp`} type="number" value={score.score}  />
              </div>
            </button>
          </h2>
          <div id={`collapse${color}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>History:</strong> {score.history}
            </div>
          </div>
        </div>


        <div>
          {score.winner ? <img src={require(`./../../../images/crown.png`)} alt="winner" /> : null}
        </div>


    </div>


  )
}

export default DutchCard