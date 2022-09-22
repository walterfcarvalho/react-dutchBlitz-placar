import React, { ChangeEvent } from 'react' 
import PropTypes from 'prop-types';
import './Players.css'
import { IInfoPlayer } from '../../interfaces'

const Players = ({ cores, handleCheck, round }: IInfoPlayer) => {

return <div className="listaPlayers" >
    {cores.map( (cor, idx) => (
      
      <div key={cor.nome} className="form-check">
        <input 
          data-testid={`checkbox-${cor.nome}`}
          className="form-check-input" 
          type="checkbox" 
          id={`check-${cor.nome}`} 
          checked={cor.enabled}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCheck(e, idx) } 
          disabled={round > 1} 
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">{cor.nome}</label>
      </div>
    ))}
  </div>
}

Players.propTypes = {
  handleCheck: PropTypes.func,
};

export default Players
