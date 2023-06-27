import React from "react";
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Results, { ResultsProps } from '../src/components/Results'

describe('Results Component', () => {
    const resultsProps: ResultsProps = {
        showResults: true,
        results: {
            "0": [
                "Chris",
                "Adam"
            ]
        },
        isPerson: true,
    }

    it('Correctly displays 2 individuals', () => {
        render(<Results {...resultsProps} />)
        expect(screen.getByText('Chris, Adam')).toBeInTheDocument()
    })

    it('Correctly displays a single individual', () => {
        resultsProps.results = { "0": ["Chris"] }
        render(<Results {...resultsProps} />)
        expect(screen.getByText('Chris')).toBeInTheDocument()
    })

    it('Correctly displays 2 groups', () => {
        resultsProps.results = { "0": ["Beth", "Adam"], "1": ["Don", "Chris"] }
        resultsProps.isPerson = false
        render(<Results {...resultsProps} />)
        expect(screen.getByText('Group 1:')).toBeInTheDocument()
        expect(screen.getByText('Beth, Adam')).toBeInTheDocument()
        expect(screen.getByText('Group 2:')).toBeInTheDocument()
        expect(screen.getByText('Don, Chris')).toBeInTheDocument()
    })

    it('It displays nothing if showResults is false', () => {
        const resultsProps = {
            showResults: false,
            results: {},
            isPerson: false,
        }
        const { container } = render(<Results {...resultsProps} />)
        expect(container.innerHTML).toEqual('');
    })
})
