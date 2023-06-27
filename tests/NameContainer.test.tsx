import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import NameContainer from '../src/components/NameContainer'
// import userEvent from '@testing-library/user-event'

const nameContainerProps = {
    names: ['Adam', 'Beth', 'Chris', 'Don'],
    isPerson: true,
    count: 2
}

describe('NameContainer', () => {

    it('Correctly displays all added names', () => {
        render(<NameContainer {...nameContainerProps} />)
        expect(screen.getByText('Pick 2 Individuals from:')).toBeInTheDocument()
        expect(screen.getByText('Adam')).toBeInTheDocument()
        expect(screen.getByText('Beth')).toBeInTheDocument()
        expect(screen.getByText('Chris')).toBeInTheDocument()
        expect(screen.getByText('Don')).toBeInTheDocument()
    })



    it('Correctly displays count of 2+ individuals', () => {
        render(<NameContainer {...nameContainerProps} />)
        expect(screen.getByText('Pick 2 Individuals from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 1 individual', () => {
        nameContainerProps.count = 1
        render(<NameContainer {...nameContainerProps} />)
        expect(screen.getByText('Pick 1 Individual from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 2+ groups', () => {
        nameContainerProps.isPerson = false;
        nameContainerProps.count = 4
        render(<NameContainer {...nameContainerProps} />)
        expect(screen.getByText('Pick 4 Groups from:')).toBeInTheDocument()
    })

    it('Correctly displays count of 1 group', () => {
        nameContainerProps.isPerson = false;
        nameContainerProps.count = 1
        render(<NameContainer {...nameContainerProps} />)
        expect(screen.getByText('Pick 1 Group from:')).toBeInTheDocument()
    })

    it('Nothing shows when names array is empty', () => {
        nameContainerProps.names = []
        const { container } = render(<NameContainer {...nameContainerProps} />)
        expect(container.innerHTML).toEqual('');
    })
})


