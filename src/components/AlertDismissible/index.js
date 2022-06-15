import React from 'react'
import Alert from 'react-bootstrap/Alert'

const  AlertDismissible = ({erro, handleErro}) => {

  if (erro.show) {
    return (
      <Alert variant="secondary" onClose={() => handleErro({show:false, text: "" })} dismissible>
        <p> {erro.text}</p>
      </Alert>
    );
  }
  return <div> </div> 
}
export default AlertDismissible