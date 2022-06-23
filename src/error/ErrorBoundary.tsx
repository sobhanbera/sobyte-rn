/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - Error Boundary - https://reactjs.org/docs/error-boundaries.html
 */

import React from 'react'
import FallbackComponent from './FallbackComponent'

interface ErrorBoundaryProps {
    fallbackComponent?: React.ReactNode
    children: React.ReactChild
    id: string
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = {
        hasError: false,
        error: {
            name: '',
            message: '',
        },
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true, error: error}
    }

    componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {}

    render() {
        // render the fallback component when any error occurs.
        if (this.state.hasError) {
            return (
                <FallbackComponent
                    id={this.props.id}
                    error={this.state.error}
                />
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
