import React from 'react'
import { fireEvent, getByLabelText, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DutchGame from './../DutchGame'

describe('On start application...', () => {

  it('Check components...', () => {
    render(<DutchGame />)
    expect(screen.getByText('Dutch Blitz Placar')).toBeInTheDocument()
  })

})

describe('Testing clicks...', () => {

  it('Check toogle player..', () => {
    render(<DutchGame />)

    const checkYellow = screen.getByTestId("checkbox-yellow")
    const cardRed = screen.getByTestId("accordion-item-red")
    const cardYellow = screen.getByTestId("accordion-item-yellow")

    fireEvent.click(checkYellow)

    expect(cardRed).toBeVisible()

    expect(cardYellow).not.toBeVisible()

    fireEvent.click(checkYellow)

    expect(cardYellow).toBeVisible()

  })

  it('Check two or more players....', async () => {

    render(<DutchGame />)

    const checkRed = screen.getByTestId("checkbox-red")
    const checkYellow = screen.getByTestId("checkbox-yellow")
    const checkYBlue = screen.getByTestId("checkbox-blue")

    fireEvent.click(checkRed)
    fireEvent.click(checkYellow)
    fireEvent.click(checkYBlue)

    expect(screen.getByTestId('alertdismissible')).toBeInTheDocument()
  })


  it('Check if all fields are fullfiled', async () => {
    render(<DutchGame />)


    fireEvent.change(screen.getByTestId('input-yellow-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-yellow--'), {target:{value:0}})

    fireEvent.change(screen.getByTestId('input-red-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-red--'), {target:{value:0}})

    fireEvent.change(screen.getByTestId('input-green-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-green--'), {target:{value:0}})

    await fireEvent.submit(screen.getByTestId("submit"))

    expect(screen.getByTestId('alertdismissible')).toBeInTheDocument()

    expect(screen.getByText('Fullfill blue fields.')).toBeInTheDocument()

  })

  it('Check then end of the game',  () => {
    render(<DutchGame />)

    fireEvent.change(screen.getByTestId('input-yellow-+'), {target:{value:75}})
    fireEvent.change(screen.getByTestId('input-yellow--'), {target:{value:0}})

    fireEvent.change(screen.getByTestId('input-red-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-red--'), {target:{value:2}})

    fireEvent.change(screen.getByTestId('input-green-+'), {target:{value:12}})
    fireEvent.change(screen.getByTestId('input-green--'), {target:{value:4}})

    fireEvent.change(screen.getByTestId('input-blue-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-blue--'), {target:{value:6}})

    fireEvent.submit(screen.getByTestId("submit"))

    expect(screen.getByTestId('winner-yellow')).toBeInTheDocument()

  })

  it('Check creation of a new game', () => {
    render(<DutchGame />)

    fireEvent.change(screen.getByTestId('input-yellow-+'), {target:{value:50}})
    fireEvent.change(screen.getByTestId('input-yellow--'), {target:{value:0}})

    fireEvent.change(screen.getByTestId('input-red-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-red--'), {target:{value:2}})

    fireEvent.change(screen.getByTestId('input-green-+'), {target:{value:12}})
    fireEvent.change(screen.getByTestId('input-green--'), {target:{value:4}})

    fireEvent.change(screen.getByTestId('input-blue-+'), {target:{value:10}})
    fireEvent.change(screen.getByTestId('input-blue--'), {target:{value:6}})

    fireEvent.submit(screen.getByTestId("submit"))

    expect(screen.getByTestId('input-yellow-Total').value).toBe("50")
    expect(screen.getByTestId('input-red-Total').value).toBe("8")
    expect(screen.getByTestId('input-green-Total').value).toBe("8")
    expect(screen.getByTestId('input-blue-Total').value).toBe("4")
    
    fireEvent.click(screen.getByTestId("button-new"))

    expect(screen.getByTestId('input-yellow-Total').value).toBe("")
    expect(screen.getByTestId('input-red-Total').value).toBe("")
    expect(screen.getByTestId('input-green-Total').value).toBe("")
    expect(screen.getByTestId('input-blue-Total').value).toBe("")
    
  })

})
