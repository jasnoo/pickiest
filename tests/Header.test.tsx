import React from 'react';
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../src/components/Header'

describe('Header', () => {
    it('Header renders and shows correct text', () => {
        render(<Header />)
        expect(screen.getByText('Pickiest')).toBeInTheDocument()
        expect(screen.getByText('The easiest way to pick randomly')).toBeInTheDocument()
        expect(screen.queryByText('Add')).not.toBeInTheDocument()
    })
})