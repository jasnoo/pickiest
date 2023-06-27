import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Switch, { SwitchProps } from '../src/components/Switch'

vi.mock('react-switch-selector', () => {
    const Switch = vi.fn().mockImplementation(() => 'switch selector')
    return { default: Switch }
})

const switchprops: SwitchProps = {
    handleToggle: () => vi.fn()
}

describe('Switch component', () => {
    it('Correctly displays all added names', () => {
        render(<Switch {...switchprops} />)
        expect(screen.getByText('switch selector')).toBeInTheDocument()
    })

})


