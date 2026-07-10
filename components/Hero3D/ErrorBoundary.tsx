"use client";

import { Component, ReactNode } from "react";
import StaticFallback from "./StaticFallback";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class Hero3DErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Keep this console.error: it's the intended diagnostic path for
    // WebGL/runtime failures in production, without crashing the page.
    console.error("Hero3D failed to render, falling back to static image:", error);
  }

  render() {
    if (this.state.hasError) return <StaticFallback />;
    return this.props.children;
  }
}
