import './card.css'


const DutchCard = ({ logo, color, score, handleChange, isEndGame }) => {

  return (
    <div className={`dutchCard  ${color}`}>

      <img src={require(`./../../../images/${logo}.png`)} alt= "descricao" />

      <div className="scores">
          <input min={0} max={99} className={color} id={`${color}-bp`} type="number"  value={score.bp} onChange={handleChange} disabled={isEndGame} />
          <input min={0} max={99} className={color} id={`${color}-dp`} type="number" value={score.dp} onChange={handleChange}  disabled={isEndGame} />
      </div>

      <div className="scorehistory">
        <span>{score.history}</span>
      </div>

      <div className="total">
        <div className="totalScore">
          {score.score}
        </div>
      </div>

      <div>
        {score.winner ? <img src={require(`./../../../images/crown.png`)} alt= "winner"/> : null }
      </div>

    </div>
  )
}

export default DutchCard