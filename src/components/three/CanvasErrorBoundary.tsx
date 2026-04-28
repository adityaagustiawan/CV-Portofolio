import type { ReactNode } from "react";
import { Component } from "react";

type CanvasErrorBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

export default class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

