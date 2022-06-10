import PropTypes from 'prop-types';
import './Players.css'




const Players = ({ cores, handleCheck, round }) => {


return <div className="listaPlayers" >
    {cores.map( (cor, index) => (
      
      <div key={cor.nome} className="form-check">
        <input className="form-check-input" type="checkbox" id={`check-${cor.nome}`} checked={cor.enabled} onChange={(evt) => handleCheck(evt, index)} idcor={index} disabled={round > 1} />
        <label className="form-check-label" htmlFor="flexCheckDefault">{cor.nome}</label>
      </div>
    ))}
  </div>
}

Players.propTypes = {
  handleCheck: PropTypes.func,
};

export default Players
