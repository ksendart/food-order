import { Component, ErrorInfo } from 'react';
import ErrorIndicator from './error-indicator';

export class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({error, hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>;
    }
    return this.props.children;
  }
}
