import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import NameContainer from '../src/components/NameContainer'
// import userEvent from '@testing-library/user-event'

const NameContainerProps = {
    names: ['Adam', 'Beth', 'Chris', 'Don'],
    isPerson: true,
    count: 2
}

describe('NameContainer', () => {

    it('Correctly displays all added names', () => {
        render(<NameContainer {...NameContainerProps} />)
        expect(screen.getByText('Pick 2 Individuals from:')).toBeInTheDocument()
        expect(screen.getByText('Adam')).toBeInTheDocument()
        expect(screen.getByText('Beth')).toBeInTheDocument()
        expect(screen.getByText('Chris')).toBeInTheDocument()
        expect(screen.getByText('Don')).toBeInTheDocument()
    })



    it('Correctly displays count of 2+ individuals', () => {
        render(<NameContainer {...NameContainerProps} />)
        expect(screen.getByText('Pick 2 Individuals from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 1 individual', () => {
        NameContainerProps.count = 1
        render(<NameContainer {...NameContainerProps} />)
        expect(screen.getByText('Pick 1 Individual from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 2+ groups', () => {
        NameContainerProps.isPerson = false;
        NameContainerProps.count = 4
        render(<NameContainer {...NameContainerProps} />)
        expect(screen.getByText('Pick 4 Groups from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 1 group', () => {
        NameContainerProps.isPerson = false;
        NameContainerProps.count = 1
        render(<NameContainer {...NameContainerProps} />)
        expect(screen.getByText('Pick 1 Group from:')).toBeInTheDocument()
    })

    it('Nothing shows when names array is empty', () => {
        NameContainerProps.names = []
        const { container } = render(<NameContainer {...NameContainerProps} />)
        expect(container.innerHTML).toEqual('');
    })
})


