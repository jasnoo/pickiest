import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Counter from '../src/components/Counter'
import userEvent from '@testing-library/user-event'

const incrementMock = vi.fn()
const decrementMock = vi.fn()
const mockSetCount = vi.fn()
const mockCheckCount = vi.fn()
const counterProps = {
    count: 2,
    incrementCount: incrementMock,
    decrementCount: decrementMock,
    checkCount: mockCheckCount,
    setCount: mockSetCount
}

describe('Counter', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('Two buttons should exist with -/+ text', () => {
        render(<Counter {...counterProps} />)
        const buttons = screen.getAllByRole('button')
        expect(buttons[0]).toHaveTextContent('-')
        expect(buttons[1]).toHaveTextContent('+')

    })
    it('Count field to show correct Count value', async () => {
        render(<Counter {...counterProps} />)
        expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    })

    it('User clicks on (-) should invoke decrementing function', async () => {
        render(<Counter {...counterProps} />)
        await userEvent.click(screen.getAllByRole('button')[0])
        expect(decrementMock).toHaveBeenCalledTimes(1)
        expect(incrementMock).toHaveBeenCalledTimes(0)
    })

    it('User clicks on (+) should invoke incrementing function', async () => {
        render(<Counter {...counterProps} />)
        await userEvent.click(screen.getAllByRole('button')[1])
        expect(decrementMock).toHaveBeenCalledTimes(0)
        expect(incrementMock).toHaveBeenCalledTimes(1)
    })

    it('setcount function is called once per key press', async () => {
        counterProps.count = 20;
        render(<Counter {...counterProps} />)
        screen.debug()
        await userEvent.type(screen.getByRole('spinbutton'), '10')
        expect(mockSetCount).toHaveBeenCalledTimes(2)

    })

    it('checkCount function is run when user leaves the count input', async () => {
        counterProps.count = 20;
        render(<Counter {...counterProps} />)
        screen.debug()
        await userEvent.type(screen.getByRole('spinbutton'), '5')
        await userEvent.tab()
        expect(mockCheckCount).toHaveBeenCalledTimes(1)
        await userEvent.type(screen.getByRole('spinbutton'), '5')
        await userEvent.click(screen.getAllByRole('button')[0])
        expect(mockCheckCount).toHaveBeenCalledTimes(2)

    })
})
