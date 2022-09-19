/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

// courtesy from https://reactjs.org/docs/error-boundaries.html

import React from 'react'

export interface IAppBoundaryProps {
  fallback?: JSX.Element | any
  children?: JSX.Element | JSX.Element[]
}
class AppBoundary extends React.Component {
  constructor(props: IAppBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h3>Oops! Something went wrong. Please try again</h3>
    }
    if (this.props.fallback) return this.props.fallback
    return this.props.children
  }
}

export default AppBoundary
