import { Component } from 'react';

/**
 * Renders `fallback` (default: nothing) if a child throws, and reports the error via
 * `onError`. Used to fall back to the 2D workspace if the 3D scene fails at runtime.
 */
export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}
