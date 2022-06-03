import './input.css'  

const Input = ({color, score, handleChange, isDisabled, inputLabel, tpOp  }) => {

  return (
    <div className='inputValor'>
      <strong>{inputLabel}</strong>
      <input min={0} max={99} className={`${color} bpdp`} id={`${color}-${tpOp}`} type="number" value={score} onChange={handleChange} readOnly={isDisabled} />
    </div>
  )

}

export default Input