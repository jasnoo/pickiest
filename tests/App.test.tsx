import React from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import userEvent from '@testing-library/user-event'


describe('App component', () => {


    it('Two buttons should exist with -/+ text', () => {
        render(<App />)
        screen.debug()

    })
})
