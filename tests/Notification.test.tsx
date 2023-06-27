import React from "react";
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Notification, { NotificationProps } from '../src/components/Notification'


const notificationProps: NotificationProps = {
    message: 'Test Message'
}

describe('Notification Component', () => {

    it('Correctly displays non-null message', () => {
        render(<Notification {...notificationProps} />)
        expect(screen.getByText('Test Message')).toBeInTheDocument()

    })

    it('Displays nothing when there is no message', () => {
        notificationProps.message = null
        const { container } = render(<Notification {...notificationProps} />)
        expect(container.innerHTML).toEqual('');
    })
})


