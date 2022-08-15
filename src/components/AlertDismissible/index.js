import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const AlertDismissible = ({ erro, handleErro }) => {

  return erro.text 
  ? <Alert data-testid="alertDismissible" variant="secondary" onClose={handleErro} dismissible>
      <p> {erro.text}</p>
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