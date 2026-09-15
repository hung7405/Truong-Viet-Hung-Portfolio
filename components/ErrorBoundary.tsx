"use client";
import { Component, ReactNode } from "react";

export default class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="h-[380px] md:h-[480px] grid place-items-center rounded-3xl bg-gradient-to-br from-neon/20 via-violet2/20 to-magenta/20 font-mono text-xs text-zinc-400">
            3D unavailable — content below still works
          </div>
        )
      );
    }
    return this.props.children;
  }
}
