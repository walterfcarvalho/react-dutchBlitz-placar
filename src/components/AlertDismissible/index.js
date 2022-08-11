import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const AlertDismissible = ({ erro, handleErro }) => {

  if (erro.show) {
    return (erro.show &&
      <Alert data-testid="alertdismissible" variant="secondary" onClose={handleErro} dismissible>
        <p> {erro.text}</p>
      </Alert>
    );
  }
  return <div data-testid="alertdismissible-empty"> </div>
}

AlertDismissible.defaultProps = {
  erro: { show: false, text: "" }
}

// AlertDismissible.propTypes = {
//   conta: PropTypes.string,
// }

export default AlertDismissible
