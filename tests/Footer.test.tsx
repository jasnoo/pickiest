import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../src/components/Footer'

describe('Footer', () => {

    it('Footer shows the correct text', () => {
        const { getByText } = render(<Footer />);
        const getByTextWithMarkup = (text: string) => {
            getByText((content, node) => {
                const hasText = (node: HTMLElement) => node.textContent === text
                const childrenDontHaveText = Array.from(node?.children || []).every(child => !hasText(child as HTMLElement))
                return hasText(node) && childrenDontHaveText
            })
        }
        getByTextWithMarkup('Made by Jasmine N.')
    })

    it('Footer has correct link that goes to github repo', () => {
        render(<Footer />)
        expect(screen.getByRole('link', { name: 'Jasmine N.' })).toHaveAttribute('href', 'https://github.com/jasnoo/pickiest')
    })
})
