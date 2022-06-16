import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const AlertDismissible = ({erro, handleErro}) => {

  if (erro) {
    return (
      <Alert data-testid="alertdismissible" variant="secondary" onClose={handleErro} dismissible>
        <p> {erro}</p>
      </Alert>
    );
  }
  return <div data-testid="alertdismissible-empty"> </div> 
}

AlertDismissible.defaultProps = {
  erro: false
}

AlertDismissible.propTypes = {
  conta: PropTypes.string,
}

export default AlertDismissible