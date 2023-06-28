import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import userEvent from '@testing-library/user-event'


vi.mock('react-switch-selector', () => {
    const Switch = vi.fn().mockImplementation(() => 'switch selector')
    return { default: Switch }
})

describe('App component', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Header', () => {
        it('Renders header as expected', () => {
            render(<App />)
            expect(screen.getByText('Pickiest'))
            expect(screen.getByText('The easiest way to pick randomly'))
        })

    })

    describe('Counter Component', () => {
        it('Counter component renders', () => {
            render(<App />)
            const buttons = screen.getAllByRole('button')
            expect(buttons[0]).toHaveTextContent('-')
            expect(buttons[1]).toHaveTextContent('+')
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveValue(1)
        })

        it('Plus/Minus button works as expected', async () => {
            render(<App />)
            const plusButton = screen.getAllByRole('button')[1]
            const minusButton = screen.getAllByRole('button')[0]
            const input = screen.getByRole('spinbutton')
            expect(input).toHaveValue(1)
            await userEvent.click(plusButton)
            expect(input).toHaveValue(2)
            await userEvent.click(plusButton)
            expect(input).toHaveValue(3)
            await userEvent.click(minusButton)
            expect(input).toHaveValue(2)
            await userEvent.click(minusButton)
            expect(input).toHaveValue(1)
            // field should not go below 1
            await userEvent.click(minusButton)
            expect(input).toHaveValue(1)
        })

        it('Input field works as expected', async () => {
            render(<App />)
            const input = screen.getByRole('spinbutton')
            // user changes value to valid number 
            await userEvent.clear(input)
            await userEvent.type(input, '5')
            await userEvent.tab()
            expect(input).toHaveValue(5)
            // should change to the max value of 12 if number is > 12
            await userEvent.clear(input)
            await userEvent.type(input, '30')
            await userEvent.tab()
            expect(input).toHaveValue(12)
            // user changes value to 0
            await userEvent.clear(input)
            await userEvent.type(input, '0')
            await userEvent.tab()
            expect(input).toHaveValue(1)
        })
    })

    describe('Notification (error) Component', () => {
        it('User tries to pick items while nothing has been added', async () => {
            render(<App />)
            await userEvent.click(screen.getAllByRole('button')[3])
            expect(screen.getByText('Please add items to pick from!'))
        })

        it('User tries to pick items while nothing has been added', async () => {
            render(<App />)
            // increase pick count to 2
            await userEvent.click(screen.getAllByRole('button')[1])
            // add one name and add it by clicking add item button
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            // click pick button
            await userEvent.click(screen.getAllByRole('button')[3])
            expect(screen.getByText('Please add more items to pick from!'))
        })

        it('User tries add duplicate item', async () => {
            render(<App />)
            // add one name and add it by clicking add item button (twice)
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            expect(screen.getByText('Item has already been added to list.'))
        })

        it('User tries to submit empty field', async () => {
            render(<App />)
            await userEvent.click(screen.getAllByRole('button')[2])
            expect(screen.getByText('Item field cannot be empty!'))
        })

    })

    describe('NameContainer component', () => {
        it('User adds items and picks individuals', async () => {
            render(<App />)
            // adds 2 names with default selection of picking 1 individual
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.type(screen.getByRole('textbox'), 'Beth')
            await userEvent.click(screen.getAllByRole('button')[2])
            expect(screen.getByText('Pick 1 Individual from:'))
            expect(screen.getByText('Adam'))
            expect(screen.getByText('Beth'))
            // increase pick count to 2
            await userEvent.click(screen.getAllByRole('button')[1])
            expect(screen.getByText('Pick 2 Individuals from:'))
        })

        // need to have group option 
        // it('User adds items and picks groups', async () => {
        //     render(<App />)
        //     // need to be able to set group option

        //     // adds 2 names 
        //     await userEvent.type(screen.getByRole('textbox'), 'Adam')
        //     await userEvent.click(screen.getAllByRole('button')[2])
        //     await userEvent.type(screen.getByRole('textbox'), 'Beth')
        //     await userEvent.click(screen.getAllByRole('button')[2])
        //     expect(screen.getByText('Pick 2 Groups from:'))
        //     expect(screen.getByText('Adam'))
        //     expect(screen.getByText('Beth'))
        //     // increase pick count to 2
        //     await userEvent.click(screen.getAllByRole('button')[1])
        //     expect(screen.getByText('Pick 2 Groups from:'))
        // })

        it('Reset button clears names container', async () => {
            render(<App />)
            // adds 2 names with default selection of picking 1 individual
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            //reset button
            await userEvent.click(screen.getAllByRole('button')[4])
            expect(screen.queryByText('Pick 1 Individual from:')).toBeNull()
            expect(screen.queryByText('Adam')).toBeNull()
        })

    })

    describe('Results component', () => {
        it('User adds items and picks ', async () => {
            render(<App />)
            // adds 2 names with default selection of picking 1 individual
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.type(screen.getByRole('textbox'), 'Beth')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.click(screen.getAllByRole('button')[3])
            expect(screen.getByText('Results'))

        })

        // need to have group option 
        // it('User adds items and picks groups', async () => {
        //     render(<App />)
        //     // need to be able to set group option

        //     // adds 2 names 
        //     await userEvent.type(screen.getByRole('textbox'), 'Adam')
        //     await userEvent.click(screen.getAllByRole('button')[2])
        //     await userEvent.type(screen.getByRole('textbox'), 'Beth')
        //     await userEvent.click(screen.getAllByRole('button')[2])
        //     expect(screen.getByText('Pick 2 Groups from:'))
        //     expect(screen.getByText('Adam'))
        //     expect(screen.getByText('Beth'))
        //     // increase pick count to 2
        //     await userEvent.click(screen.getAllByRole('button')[1])
        //     expect(screen.getByText('Pick 2 Groups from:'))
        // })



        it('Adding a new name clears Results', async () => {
            render(<App />)
            // add 2 names
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.type(screen.getByRole('textbox'), 'Beth')
            await userEvent.click(screen.getAllByRole('button')[2])
            // click pick to see results
            await userEvent.click(screen.getAllByRole('button')[3])
            expect(screen.getByText('Results'))
            // add new name which should remove results
            await userEvent.type(screen.getByRole('textbox'), 'Chris')
            await userEvent.click(screen.getAllByRole('button')[2])
            expect(screen.queryByText('Results')).toBeNull()
        })

        it('Changing count clears results', async () => {
            render(<App />)
            // add 2 names
            await userEvent.type(screen.getByRole('textbox'), 'Adam')
            await userEvent.click(screen.getAllByRole('button')[2])
            await userEvent.type(screen.getByRole('textbox'), 'Beth')
            await userEvent.click(screen.getAllByRole('button')[2])
            // click pick to see results
            await userEvent.click(screen.getAllByRole('button')[3])
            expect(screen.getByText('Results'))
            // add new name which should remove results
            await userEvent.click(screen.getAllByRole('button')[1])
            expect(screen.queryByText('Results')).toBeNull()
        })

        // it('Using switch toggle clears result', async () => {
        // })

    })

    describe('Footer', () => {
        it('Renders header as expected', () => {
            render(<App />)
            expect(screen.getByText(/Made By/i))
            expect(screen.getByText(/Jasmine N./i))
            screen.debug()
        })

    })
})
