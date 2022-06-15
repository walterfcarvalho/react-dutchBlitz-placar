import React from 'react'
import { fireEvent, getByLabelText, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DutchGame  from './../DutchGame'

describe('On start application...', () => {

  it('Check components...', () => {
    render(<DutchGame />)
    expect(screen.getByText('Dutch Blitz Placar' ) ).toBeInTheDocument()
  })

})
  

describe('Testing clicks...', () => {

  it('Check toogle player..',  async () => {
    render(<DutchGame />)
    
    const checkYellow = screen.getByTestId("checkbox-yellow")
    const cardRed = screen.getByTestId("accordion-item-red")
    const cardYellow = screen.getByTestId("accordion-item-yellow")
    
    await fireEvent.click(checkYellow)
    
    expect(cardRed).toBeVisible()

    expect(cardYellow).not.toBeVisible()

    await fireEvent.click(checkYellow)

    expect(cardYellow).toBeVisible()

  })

})