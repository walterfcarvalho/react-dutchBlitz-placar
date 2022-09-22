import React from 'react'
import "./input.css";
import {IInputData } from '../../interfaces'


const Input = (props:IInputData) => {
  return (
    <div className="inputValor">
      <strong>{props.inputLabel}</strong>
      <input
        min={0}
        max={99}
        className="bpdp"
        id={`${props.color}-${props.tpOp}`}
        data-testid={`input-${props.color}-${props.tpOp}`}
        type="number"
        value={props.score ? props.score : ""}
        onChange={props.handleChange}
        readOnly={props.isDisabled}
      />
    </div>
  );
};

export default Input;
