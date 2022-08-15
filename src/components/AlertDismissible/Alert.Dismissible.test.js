import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AlertDismissible, { closeAlert } from './../AlertDismissible'


describe('Check component...', () => {

  let erro = "mensagem"

  let funcTeste = () => { erro = ""}

  it('Check creation component...', () => {
    render(<AlertDismissible  erro={ {text:"Msg Erro"} } handleErro={funcTeste}/>)
    expect(screen.getByTestId('alertDismissible')).toBeInTheDocument()
  })

  it('Check creation component without message...', () => {
    render(<AlertDismissible  erro={ {text: ""} } handleErro={funcTeste}/>)
    expect(screen.getByTestId('alertDismissible-empty')).toBeInTheDocument()
  })


})
