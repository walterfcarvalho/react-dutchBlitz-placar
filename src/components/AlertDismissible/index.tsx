import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'
import { IError } from "interfaces"

const AlertDismissible = ({ erro, handleErro }: IError) => {

  return erro 
  ? <Alert data-testid="alertDismissible" variant="secondary" onClose={handleErro} dismissible>
      <p> {erro}</p>
    </Alert>
  : <div data-testid="alertDismissible-empty"> </div>
}

AlertDismissible.defaultProps = {
  erro: PropTypes.shape({
    text: PropTypes.string
  }),

  handleErro: PropTypes.func
}

export default AlertDismissible
